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

<<<<<<< HEAD
// Add tag to image using image id
=======
// ADD tag to image using image id
>>>>>>> master
router.post('/add/:id', (req, res) => {
    let newTag = new Tag(req.body);
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
                    } else {
                        res.send("added tag to image");
                    }
                });
        }
    });

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