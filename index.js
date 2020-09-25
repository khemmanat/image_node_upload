//  setup
const fs = require("fs");
const express = require("express");
const multer = require('multer');
//var sftpStorage = require('multer-sftp');
const app = express();
const path = require('path');
const Client = require('ssh2-sftp-client');
const client = new Client();
const jwt = require('jsonwebtoken');
// require dotenv libs
require('dotenv').config();

// var uploadpic = sftp.uploadPic;
// db setup
const db = require("./mysql.js");
const Uploaddb = db.upload;

// stfp upload storage and renaming setup
/*
var config = {
    host: '122.155.202.69',
    port: 1922,
    username: 'devops',
    password: 'Tanos5.',
    //debug: (info) => { console.log(info) }
};
*/
// dotenv test for sftp server
var config = {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD
};
// console.log(process.env.HOST);
// console.log(process.env.PORT);
// console.log(process.env.USER);
// console.log(process.env.PASSWORD);
// var remoteStorage = sftpStorage({
//     sftp: {
//         host: '122.155.202.69',
//         port: 1922,
//         username: 'devops',
//         password: 'Tanos5.',
//         debug: (info) => { console.log(info) }
//     },
//     destination: function (req, file, cb) {
//         let path = '/var/www/html/devops1.houseofdev.tech/node_upload_img/uploads/' + req.body.project;

//         client.connect(config)
//             .then(() => {
//                 return client.exists(path);
//             })
//             .then(data => {
//                 console.log(data);
//                 if (!data) { // will be false or d, -, l (dir, file or link)
//                     console.log('info: directory not found, creating');
//                     return client.mkdir(path, true);
//                 }
//             })
//             .then(() => {
//                 console.log('directory created, or existed. continue...')
//                 return client.end();
//             })
//             .then(() => {
//                 return cb(null, "/../..");
//             })
//             .catch(err => {
//                 console.error(err.message);
//             });

//     },
//     filename: function (req, file, cb) {
//         var filename = file.originalname;
//         var fileExtension = filename.split(".")[1];
//         cb(null, req.body.type + "-" + filename.split(".")[0] + '-' + Date.now() + "." + fileExtension);
//     }
// });

//--------for local storage-------

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = __dirname + '\\uploads\\' + req.params.project;
        fs.exists(path, (exists) => {
            if (!exists) {
                fs.mkdirSync(path, { recursive: true });
                //console.log('directory created');
                cb(null, path);
            } else {
                cb(null, path);
            }
        });

    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        //console.log(req.body);
        var new_filename = req.params.type + '-' + Date.now() + "." + fileExtension;
        cb(null, new_filename);
    }
});

//upload middleware handler
var upload = multer({ storage: storage });


//  API
app.get('/', (req, res) => {
    res.send("<strong>Server is working correctly!</strong>");
});
// อัพโหลดไฟล์
app.post('/upload/:project/:type', upload.single('file'), async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        //console.log(req.file);
        //put to remote dir
        var path = process.env.REMOTEPATH + req.params.project;
        var filepath = path + '/' + req.file.filename;
        //console.log(path + '/' + req.file.filename);
        if(req.file.filename.split('.'))
        client.connect(config)
            .then(() => {
                return client.exists(path);
            })
            .then(data => {
                console.log('folder status: ' + data);
                if (!data) { // will be false or d, -, l (dir, file or link)
                    console.log('info: directory not found, creating');
                    return client.mkdir(path, true);
                }
                console.log('directory existed, continue...')
            })
            .then(() => {
                return client.cwd();
            })
            .then(() => {
                return client.fastPut(req.file.path, filepath);
            })
            .then(() => {
                console.log('file moved to remote server');
                return client.end();
            })
            .then(() => {
                fs.unlink(req.file.path, () => {
                    console.log('local file deleted');
                });
            })
            .catch(err => {
                console.error(err.message);
            });
        // create record and add it to database
        let record = await Uploaddb.create({
            link: 'https://devops1.houseofdev.tech/node_upload_img/uploads/' + req.params.project + '/' + req.file.filename,
            dir: path + '/' + req.file.filename,
            filename: req.file.filename,
            type: req.params.type,
            project: req.params.project
        });
        var id_token = jwt.sign({ id: record.id }, process.env.TOKEN_KEY);
        return res.send({
            success: true,
            // id: record.id,
            token: id_token
        })
    }
});

// เรียก list ของไฟล์ตาม project และประเภท
app.get('/get/:project/:type', async (req, res) => {
    if (req.params.type == 'all') {
        let record = await Uploaddb.findAll({
            where: {
                project: req.params.project
            }
        });
        res.send(record);
    } else {
        let record = await Uploaddb.findAll({
            where: {
                project: req.params.project,
                type: req.params.type
            }
        });
        res.send(record);
    }
});
//เรียกดูไฟล์ทั้งหมดที่อยู่ใน upload directory
app.get('/dir', async (req, res) => {
    client.connect(config)
        .then(() => {
            return client.list(process.env.REMOTEPATH);
        })
        .then(data => {
            //console.log(data);
            return res.send(data);
        })
        .then(() => {
            return client.end();
        })
        .catch(err => {
            console.error(err.message);
        });
});
//get link ไฟล์ตามไอดีใน database
app.get('/link/:token', async (req, res) => {
    //console.log('calling API link...');
    var decoded = jwt.verify(req.params.token, process.env.TOKEN_KEY);
    let record = await Uploaddb.findOne({
        where: {
            id: decoded.id
        }
    });
    res.send(record.link);
});
//เรียกไฟล์ตามไอดีใน database
app.get('/file/:token', async (req, res) => {
    var decoded = jwt.verify(req.params.token, process.env.TOKEN_KEY);
    let record = await Uploaddb.findOne({
        where: {
            id: decoded.id
        }
    });
    let localpath = __dirname + "/uploads/";
    let localfile = localpath + record.filename;
    client.connect(config)
        .then(() => {
            return client.fastGet(record.dir, localfile);
        })
        .then(() => {
            res.sendFile(localfile);
        })
        .then(() => {
            return client.end();
        })
        .then(() => {
            fs.unlink(localfile);
        })
        .catch(err => {
            console.error(err.message);
        });
});

app.listen(process.env.LISTEN_PORT, () => {
    console.log(`Server start on port ` + process.env.LISTEN_PORT);
});
