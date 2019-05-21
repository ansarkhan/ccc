const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String
    }
});

const Tag = mongoose.model("Tag", TagSchema);

// Export the Tag model
module.exports = Tag;
