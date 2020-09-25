//  setup
var fs = require("fs");
const express = require("express");
var multer = require('multer');
const app = express();
const path = require('path');

// db setup
const db = require("./mysql.js");
const Uploaddb = db.upload;

// upload storage and renaming setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = __dirname + '\\uploads\\' + req.body.project;
        fs.exists(path, (exists) => {
            if (!exists) {
                fs.mkdirSync(path, { recursive: true });
                console.log('directory created');
                cb(null, path);
            } else {
                cb(null, path);
            }
        });

    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, req.body.type + "-" + filename.split(".")[0] + '-' + Date.now() + "." + fileExtension);
    }
});
var upload = multer({ storage: storage });


//  API
app.get('/', (req, res) => {
    res.send("<strong>TEST</strong>");
})
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        console.log(typeof req.file.path);
        //create record and add it to database
        let record = await Uploaddb.create({
            link: "www.google.com",
            dir: req.file.path,
            type: req.body.type,
            project: req.body.project
        });
        return res.send({
            success: true,
        })
    }
});

app.get('/:proj/:type', async (req, res) => {
    let record = await Uploaddb.findAll({
        where: {
            project: req.params.proj,
            type: req.params.type
        }
    });
    res.send(record);
});

app.get('/:id', async (req, res) => {
    let record = await Uploaddb.findAll({
        where: {
            id: req.params.id
        }
    });
    res.sendFile(record[0].dir);
});

app.listen(3000, () => {
    console.log(`Server start on port 3000`);
});
