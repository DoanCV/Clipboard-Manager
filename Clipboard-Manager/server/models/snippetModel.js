const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

// design table
const snippetSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String},
    user: {type: ObjectID, required: true}
}, {
    timestamps: true
});

const Snippet = mongoose.model("snippet", snippetSchema);

module.exports = Snippet;
