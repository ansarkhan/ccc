const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    createdAt: {
        type: Date
    },
    name: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
      }],
    url: {
        type: String
    }
});

const Image = mongoose.model("Image", ImageSchema);

// Export the Image model
module.exports = Image;
