const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const authorSchema = mongoose.Schema({
    id: {
        type: Number,
        default: () => uuid()
    },
    fullName: {
        name: String,
        surname: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    description: String,

});

module.exports = mongoose.model("Author", authorSchema);

