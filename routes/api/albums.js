const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');
const Image = require('../../models/Image');
const Tag = require('../../models/Tag');

// GET all albums
router.get('/', (req, res) => {
    Album.find({})
        .populate("images")
        .then(function (found) {
            res.json(found);
        })
        .catch(function (err) {
            res.json(err)
        });
});

// GET album with given id
router.get('/:id', (req, res) => {
    Album.findById(req.params.id)
        .populate("images")
        .then(function (found) {
            res.json(found);
        })
        .catch(function (err) {
            res.json(err)
        });
});

// UPDATE name of album with given id
router.post('/edit/:id', (req, res) => {
    console.log(req.body);

    Album.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name }
    },
        { new: true },
        function (error, doc, lastErrorObject) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.send("updated name of album");

            }
        });

});

// DELETE album with given id
router.delete('/:id', (req, res) => {

    Album.findById(req.params.id)
        .then(async function (dbAlbum) {

            Image.find({ album: dbAlbum }, async function(err, dbImages) {

                dbImages.forEach(image => {

                    Image.findById(image)
                        .then(async function (dbImage) {

                            // DELETE tags associated with each image of the album
                            dbImage.tags.forEach(tag => {
                                Tag.findByIdAndDelete(tag)
                                    .then(async function (deletedTag) {
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
                            });

                            // Also DELETE image after removing tags
                            await dbImage.remove();

                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                });
            });

            // Now DELETE album after removing images
            await dbAlbum.remove();

            res.send("Deleted Album and related images/tags. Removed image from album");
        })
        .catch(function (err) {
            console.log(err);
        });
});

module.exports = router;