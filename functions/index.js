const functions = require('firebase-functions');
// const cors = require('cors')({origin: true});
// const Busboy = require('busboy');
// const path = require('path');
// const os = require('os');
// const fs = require('fs');
const formidable = require('formidable');

const gcconfig = {
    keyFilename: 'tatabox-c2abe-firebase-adminsdk-xkcih-107383e3a2.json',
}

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//https://us-central1-tatabox-c2abe.cloudfunctions.net/uploadFile
exports.uploadFile = functions.https.onRequest((req, res) => {
    var form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, function(err, fields, files) {
            if (err) {
                console.log(err.stack);
            }
            var file = files.upload;
            console.info("about to upload file as a json: " + file.type);
            var filePath = file.path;
            console.log('File path: ' + filePath);

            var bucket = gcs.bucket('tatabox-c2abe.appspot.com');
            return bucket.upload(filePath, {
                destination: file.name
            }).then(() => {
                resolve();
                return null
            }).catch((err) => {
                reject(new Error('Failed to upload: ' + JSON.stringify(err)));
            });
        });
    }).then(() => {
        res.status(200).send('It worked!');
        return null
    }).catch((err) => {
        console.error('Error while parsing form: ' + err);
        res.status(500).send('Error while parsing form: ' + err);
    })

    /* cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }
        const busboy = new Busboy({headers: req.headers});
        let uploadData = null;

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = {file: filepath, type: mimetype};
            file.path(fs.createWriteStream(filepath))
        });

        busboy.on('finish', () => {
            const bucket = gcs.bucket('tatabox-c2abe.appspot.com')
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }
            }).then(() => {
                res.status(200).json({
                    message: "It worked",
                })
                return
            }).catch(err => {
                res.status(500).json({
                    error: err,
                })
            })
        })
        busboy.end(req.rawBody)
    }) */
});