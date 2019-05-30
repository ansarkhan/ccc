const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');
const Image = require('../../models/Image');
const Tag = require('../../models/Tag');

// GET all tags
router.get('/', (req, res) => {
    Tag.find({})
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});

// UPDATE MULTIPLE TAGS
// ADD/UPDATE tags to image using image id
router.post('/add/:id', (req, res) => {
    Image.findById(req.params.id)
        .then(async function (dbImage) {

            // DELETE tags associated with that image from the DB
            dbImage.tags.forEach(tag => {
                Image.findByIdAndUpdate(req.params.id, {$pull: { 'tags': tag }},{ new: true })
                .then(function (updatedImage){
                    Tag.findByIdAndDelete(tag)
                    .then(function (deletedTag) {

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
            });

            await dbImage.save();
            console.log('req.body',req.body);
            // ADD new tags from the front-end to image in the DB 
            let array = req.body.tags.split(",");
            for (let i = 0; i < array.length; i++) {
                let tagObject = {
                    "name": array[i]
                }
                // console.log('tagObject', tagObject);
                let newTag = new Tag(tagObject);
                // console.log('newTag', newTag);
                newTag.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                    } else {
                        Image.findByIdAndUpdate(req.params.id, {
                            $push: { 'tags': doc.id }
                        },
                            { new: true },
                            function (error, doc, lastErrorObject) {
                                if (error) {
                                    console.log(error);
                                    res.status(500);
                                }
                            });
                    }
                });
            }
        })

    res.send("updated image's tags");
});

// DELETE tag from an image using tag id
router.delete('/:id', (req, res) => {
    Tag.findByIdAndRemove(req.params.id, (err, tag) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.send('deleted image');
        }
    });
});

module.exports = router;