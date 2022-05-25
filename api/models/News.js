const { Schema, model } = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           required: true
 *           readOnly: true
 *           example: 628d5c9c4ce486ff956d4bcb
 *         headline:
 *           type: string
 *           required: true
 *           example: Headline example.
 *         lead:
 *           type: string
 *           required: true
 *           example: This is an example for the lead, a sentence which is longer than the headline.
 *         body:
 *           type: array
 *           items:
 *             type: string
 *           required: true
 *           example: ["First paragraph.", "Second paragraph.", "Third paragraph."]
 *         author:
 *           type: string
 *           format: uuid
 *           required: true
 *           example: 628d5bef9394d666e446a5b1
 *         date:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: 2022-05-24T22:30:52.396Z
 *         views:
 *           type: number
 *           default: 0
 *           example: 4
 *         category:
 *           type: string
 *           required: true
 *           example: Sports
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           required: true
 *           example: ["Basketball", "Michael Jordan", "Chicago Bulls"]
 *         image:
 *           type: string
 *           required: true
 *           example: http://placeimg.com/640/480
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           required: false
 *           example: 2022-05-24T22:30:52.396Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           required: false
 *           example: 2022-05-24T22:30:52.396Z
 */
const newsSchema = new Schema({
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

