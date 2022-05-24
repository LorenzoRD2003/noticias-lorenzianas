const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");

const newsSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid()
    },
    headline: {
        type: String,
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    body: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    date: {
        type: Date,
        default: () => (new Date).toLocaleString()
    },
    views: {
        type: Number,
        min: 0,
        default: 0,
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("News", newsSchema, "news");

