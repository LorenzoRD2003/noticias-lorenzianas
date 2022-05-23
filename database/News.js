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
    author: {
        type: Number,
        required: true
    },
    body: {
        type: [String],
        required: true
    },
    lead: String,
    date: {
        type: Date,
        default: () => (new Date).toLocaleString()
    },
    views: {
        type: Number,
        min: 0,
        default: 0,
    },
    category: String,
    tags: [String],
}, {
    timestamps: true
});

module.exports = model("News", newsSchema, "news");

