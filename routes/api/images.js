const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');
const Image = require('../../models/Image');
const Tag = require('../../models/Tag');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

const fs = require('fs');

// GET all images
router.get('/', (req, res) => {
    Image.find({})
        .populate("tags")
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});

// GET image with given id
router.get('/:id', (req, res) => {
    Image.findById(req.params.id)
        .populate("tags")
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});


// UPDATE name of image given image id
router.post('/edit/:id', (req, res) => {
    console.log(req.body);
    res.send("ok");

    Image.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name_new }
    },
        { new: true },
        function (error, doc, lastErrorObject) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {


            }
        });
});

// DELETE image with given id
router.delete('/:id', (req, res) => {
    Image.findById(req.params.id, function (err, foundImage) {
        foundImage.populate("tags")
            .exec(function (err, foundTags) {
                if (err) return handleError(err);

                // also DELETE tags associated with that image
                foundTags.forEach(tag => {
                    Tag.findByIdAndDelete(tag._id);
                });
            });

            foundImage.populate("album")
            .exec(function (err, foundAlbum) {
                if (err) return handleError(err);

                // also DELETE the image id from the album associated with the image
                Album.findByIdAndUpdate(foundAlbum._id), {
                    $pull: {
                        'images': {
                            _id: req.params.id
                        }
                    }
                }, { new: true }
            });

    }).remove()
});

// ADD (Upload) an Image
// Send to Rekognition to create Tags
// Create/Send Image and Tags to MongoDB
router.post('/', function (req, res) {
    let sampleFile;

    if (Object.keys(req.files).length == 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    console.log('req.files.myImage >>>', req.files.myImage); // eslint-disable-line

    let file = req.files.myImage;

    // relative path for file
    sampleFile = req.files.myImage.name;

    // absolute path for file
    let localFilePath = `${__dirname}/${sampleFile}`;

    // writing the file to server
    fs.writeFile(localFilePath, file.data, (err) => {
        if (err) throw err;
        console.log('success!!');
    })

    // verifying that file has a path on server
    console.log("this is the sample file path>>>", localFilePath)

    // creating stream for s3
    let fileStream = fs.createReadStream(localFilePath);

    // parameters for s3 upload method call
    var params = {
        Body: fileStream,
        Bucket: "ccc-project-3-sandbox",
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        Key: sampleFile,
        ACL: 'public-read-write'
    };

    // s3 upload method
    s3.upload(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log("image uploaded to s3!")
            // console.log(data);

            var rekognition = new AWS.Rekognition();

            let rkParams = {
                Image: {
                    S3Object: {
                        Bucket: "ccc-project-3-sandbox",
                        Name: data.Key
                    }
                },

            };

            rekognition.detectLabels(rkParams, function (err, res) {
                if (err) {
                    console.log(err, err.stack)
                } else {
                    console.log("Image sent to Rekognition")

                    var tags = [];
                    let length = Math.min(5, res.Labels.length);

                    for (let i = 0; i < length; i++) {
                        let tagObject = {
                            "name": res.Labels[i].Name
                        };
                        console.log('tagObject', tagObject);
                        tags.push(tagObject);
                    }

                    // for each object in tags array, create Tag model
                    Tag.create(tags)
                        .then(function (dbTag) {

                            let imageObject = {
                                "createdAt": Date.now(),
                                "name": data.Key,
                                "tags": dbTag,
                                "url": data.Location
                            };

                            // create Image model
                            Image.create(imageObject)
                                .then(function (dbImage) {

                                })
                                .catch(function (err) {
                                    console.log(err);
                                });

                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            });
        }
    });

    fs.unlink(localFilePath, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("FILE REMOVED!")
        }
    });
});

module.exports = router;