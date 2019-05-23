const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');
const Image = require('../../models/Image');
const Tag = require('../../models/Tag');

// GET all albums
app.get('/', (req, res) => {
    Album.find({})
        .populate("images")
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});

// GET album with given id
app.get('/:id', (req, res) => {
    Album.findById(req.params.id)
        .populate("images")
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});

// UPDATE name of album with given id
app.post('/edit/:id', (req, res) => {
    console.log(req.body);
    res.send("ok");

    Album.findByIdAndUpdate(req.params.id, {
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

// DELETE album with given id
app.delete('/:id', (req, res) => {
    Album.findById(req.params.id)
        .populate("images")
        .remove()
        .then(function (found) {
            // Throw any errors to the console
            res.json(found);
        })
        // If there are no errors, send the data to the browser as json
        .catch(function (err) {
            res.json(err)
        });
});

// ADD an album to an image
app.post('add/:id', (req, res) => {
    let newAlbum = new Album(req.body);
    newAlbum.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            Image.findByIdAndUpdate(req.params.id, {
                $push: { 'album': doc.id }
            },
                { new: true },
                function (error, doc, lastErrorObject) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                    } else {


                    }
                });
        }
    });

});

// TODO:
// Is this to delete an album entirely? 
// Or to remove the image from that album? 
// We may end up need both routes actually -- Nolan
app.post('/api/image-album/delete', (req, res) => {
    //find image, delete album
});


module.exports = router;