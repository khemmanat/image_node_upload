const Client = require('ssh2-sftp-client')
const sftp = new Client()
const fs = require('fs')
//my function
exports.uploadPic = (filename, pathfile) => {
    pic = new Promise((resolve, reject) => {
        let options = {
            flags: 'w', // w - write and a - append
            encoding: null, // use null for binary files
            mode: 0o666, // mode to use for created file (rwx)
            autoClose: true, // automatically close the write stream when finished
        }
        const uploadLink = sftp
            .connect({
                host: '122.155.202.69',
                port: '1922',
                username: 'devops',
                password: 'Tanos5.',
            })
            .then(() => {
                return sftp.cwd()
            })
            .then(() => {
                console.log(
                    `/var/www/html/devops1.houseofdev.tech/node_upload_img/${filename}`
                )
                return sftp.put(
                    pathfile,
                    `/var/www/html/devops1.houseofdev.tech/node_upload_img/${filename}`
                )
            })
            .then(() => {
                return sftp.end()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                console.log(`Error: ${err.message}`) // error message will include 'example-client'
                reject(err.message)
            })
    })
    return pic
}

// exports.uploadProfile = (filename, pathfile) => {
//     profile = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1922',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 console.log(
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/profile/${filename}`
//                 )
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/profile/${filename}`
//                 )
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return profile
// }
// exports.uploadBank = (filename, pathfile) => {
//     bank = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/bank/${filename}`
//                 )
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return bank
// }
// exports.uploadLicense = (filename, pathfile) => {
//     license = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/license/${filename}`
//                 )
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return license
// }
// exports.uploadLicense = (filename, pathfile) => {
//     license = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/license/${filename}`
//                 )
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return license
// }
// exports.uploadIdcard = (filename, pathfile) => {
//     license = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/idcard/${filename}`
//                 )
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return license
// }
// exports.uploadCompany = (filename, pathfile) => {
//     license = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/company/${filename}`
//                 )
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return license
// }
// exports.uploadPlace = (filename, pathfile) => {
//     license = new Promise((resolve, reject) => {
//         let optios = {
//             flags: 'w', // w - write and a - append
//             encoding: null, // use null for binary files
//             mode: 0o666, // mode to use for created file (rwx)
//             autoClose: true, // automatically close the write stream when finished
//         }
//         const uploadLink = sftp
//             .connect({
//                 host: '122.155.202.69',
//                 port: '1322',
//                 username: 'devops',
//                 password: 'Tanos5.',
//             })
//             .then(() => {
//                 return sftp.cwd()
//             })
//             .then(() => {
//                 return sftp.put(
//                     pathfile,
//                     `/var/www/html/dev.houseofdev.tech/image/qvetjob-storage-img/place/${filename}`
//                 )
//             })
//             .then((data) => {
//                 resolve(data)
//             })
//             .then(() => {
//                 return sftp.end()
//             })
//             .catch((err) => {
//                 console.log(`Error: ${err.message}`) // error message will include 'example-client'
//                 reject(err.message)
//             })
//     })
//     return license
// }
