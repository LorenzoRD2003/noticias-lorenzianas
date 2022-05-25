const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           required: true
 *           readOnly: true
 *           example: 628d5bef9394d666e446a5b1
 *         email:
 *           type: string
 *           required: true
 *           example: zella.cole@hotmail.com
 *         username:
 *           type: string
 *           required: true
 *           example: Mckenna40
 *         password:
 *           type: string
 *           format: password
 *           required: true
 *           example: L6voab0Fh6OepgS
 *         news:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             readOnly: true
 *             example: 628d5bef9394d666e446a5b1
 *           example: ["628d5ea7611737bdd2e93896", "628d5ea6611737bdd2e93892", "628d5c9c4ce486ff956d4bcb"]
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-05-24T22:30:52.396Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-05-24T22:30:52.396Z
 */
const authorSchema = new Schema({
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
    },
    news: [
        {
            type: Schema.Types.ObjectId,
            ref: "News"
        }
    ]
}, {
    timestamps: true
});

authorSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

authorSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("Author", authorSchema, "authors");

