const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    createdAt: {
        type: Date
    },
    name: {
        type: String
    },
    tags: {
        type: Array
    },
    url: {
        type: String
    }
});

const Image = mongoose.model("Image", ImageSchema);

// Export the Image model
module.exports = Image;
