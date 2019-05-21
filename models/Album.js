const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  // `Image` is an object that stores a Image id
  // The ref property links the ObjectId to the Image model
  // This allows us to populate the Album with an associated Image
  images: [{
    type: Schema.Types.ObjectId,
    ref: "Image"
  }]
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
