const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const newsSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: uuid
    },
    headline: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: [String],
        required: true
    },
    lead: String,
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        min: 0,
        default: 0,
    }
});

module.exports = mongoose.model("News", newsSchema);

