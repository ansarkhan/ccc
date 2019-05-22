const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    createdAt: {
        type: Date
    },
    name: {
        type: String,
        required: true,
        unique: true,
        default: 'My Album'
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }]
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
