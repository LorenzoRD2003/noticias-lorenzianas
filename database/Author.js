const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");
const { createHash } = require("crypto");
const bcrypt = require("bcrypt");

const authorSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid()
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

authorSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

authorSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("Author", authorSchema, "authors");

