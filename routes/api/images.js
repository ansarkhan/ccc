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
            res.json(found);
        })
        .catch(function (err) {
            res.json(err)
        });
});

// GET image with given id
router.get('/:id', (req, res) => {
    Image.findById(req.params.id)
        .populate("tags")
        .then(function (found) {
            res.json(found);
        })
        .catch(function (err) {
            res.json(err)
        });
});


// UPDATE name of image given image id
router.post('/:id', (req, res) => {

    Image.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name }
    },
        { new: true },
        function (error, doc, lastErrorObject) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {

                res.send("updated name of image");

            }
        });
});

// UPDATE album of image given image id
// AKA sort image into a new Album
// Provide the name of the new album to sort the image into
router.post('/sort/:id', (req, res) => {

    Image.findById(req.params.id)
        .then(function (dbImage) {

            // DELETE the image id from the previous album associated with the image
            Album.findByIdAndUpdate(dbImage.album._id, { $pull: { 'images': req.params.id } }, { new: true })
                .then(function (prevAlbum) {

                    // Find album with req.body.name and add the image to it. 
                    Album.findOneAndUpdate({ name: req.body.name }, { $push: { 'images': req.params.id } }, { new: true })
                        .then(async function (newAlbum) {

                            // UPDATE Image's album to the new album
                            dbImage.album = newAlbum;
                            await dbImage.save();
                            res.send("sorted image into new album");
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        .catch(function (err) {
            console.log(err);
        })
});

// DELETE image with given id
router.delete('/:id', (req, res) => {
    Image.findById(req.params.id)
        .then(function (dbImage) {

            // DELETE the image id from the album associated with the image
            Album.findByIdAndUpdate(dbImage.album, { $pull: { 'images': req.params.id } }, { new: true })
                .then(function (updatedAlbum) {

                    // also DELETE tags associated with that image from the DB
                    dbImage.tags.forEach(tag => {
                        Tag.findByIdAndDelete(tag)
                            .then(function (deletedTag) {

                                // Now DELETE image after removing tags
                                dbImage.remove()

                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    })
                })
                .catch(function (err) {
                    console.log(err);
                });

            res.send("Deleted Image and related tags. Removed image from album");
        })
        .catch(function (err) {
            console.log(err);
        });
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
                        tags.push(tagObject);
                    }

                    // for each object in tags array, create Tag model
                    Tag.create(tags)
                        .then(function (dbTag) {

                            let imageObject = {
                                "createdAt": Date.now(),
                                "name": data.Key,
                                // "album": dbAlbum,
                                "tags": dbTag,
                                "url": data.Location
                            };

                            // create Image model
                            Image.create(imageObject)
                                .then(async function (dbImage) {

                                    Album.count(async function (err, count) {
                                        if (count == 0) {
                                            console.log("No Found Albums.");

                                            let albumObject = {
                                                "createdAt": Date.now(),
                                                "images": dbImage
                                            }

                                            Album.create(albumObject)
                                                .then(async function (dbAlbum) {
                                                    console.log('dbAlbum', dbAlbum);

                                                    dbImage.album = dbAlbum;
                                                    await dbImage.save();
                                                    console.log('dbImage', dbImage);

                                                })
                                                .catch(function (err) {
                                                    console.log(err);
                                                });
                                        }
                                        else {
                                            console.log("Found " + count + " Albums.");

                                            Album.findOne({}, async function (error, dbAlbum) {
                                                if (err) {
                                                    console.log(err)
                                                }
                                                else {
                                                    dbImage.album = dbAlbum;
                                                    await dbImage.save();
                                                    console.log(dbImage);
                                                }
                                            });
                                        }
                                    });
                                })
                                .catch(function (err) {
                                    console.log(err);
                                })
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