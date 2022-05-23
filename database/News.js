const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        min: 1
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

