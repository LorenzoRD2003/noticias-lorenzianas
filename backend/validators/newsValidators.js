const { body, param } = require('express-validator');
const authorService = require("../services/authorService");

const getNewsArticleValidator = [
    param("newsId")
        .trim()
        .exists()
        .withMessage("NewsID param is required.")
        .isMongoId()
        .withMessage("The required resource was not found.")
];

const createNewsArticleValidator = [
    body("headline")
        .exists()
        .withMessage("Headline key is required"),
    body("lead")
        .exists()
        .withMessage("Lead key is required."),
    body("body")
        .exists()
        .withMessage("Body key is required."),
    body("author")
        .exists()
        .withMessage("Author key is required.")
        .custom(async author => {
            const authorExists = Boolean(await authorService.getAuthor(author));
            if (!authorExists)
                throw new Error("Author does not exist.");
            
            return true;
        }),
    body("category")
        .exists()
        .withMessage("Category key is required."),
    body("tags")
        .exists()
        .withMessage("Tags key is required."),
    body("image")
        .exists()
        .withMessage("Image key is required.")
];

const updateNewsArticleValidator = [
    param("newsId")
        .trim()
        .exists()
        .withMessage("NewsID param is required.")
        .isMongoId()
        .withMessage("The required resource was not found.")
];

const deleteNewsArticleValidator = [
    param("newsId")
        .trim()
        .exists()
        .withMessage("NewsID param is required.")
        .isMongoId()
        .withMessage("The required resource was not found.")
];

module.exports = {
    getNewsArticleValidator,
    createNewsArticleValidator,
    updateNewsArticleValidator,
    deleteNewsArticleValidator
}