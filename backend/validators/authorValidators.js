const { body, param } = require('express-validator');
const authenticationService = require("../services/authenticationService");

const getAuthorValidator = [
    param("authorId")
        .trim()
        .exists()
        .withMessage("AuthorID is required.")
        .isMongoId()
        .withMessage("The required resource was not found.")
];

const createAuthorValidator = [
    // Email must be an email and not be already in database
    body("email")
        .trim()
        .exists()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Email key must be an email.")
        .normalizeEmail()
        .custom(async email => {
            const emailAlreadyAdded = await authenticationService.emailAlreadyAdded(email);
            if (emailAlreadyAdded)
                throw new Error("Email already in use.");

            return true;
        }),

    // Username must have at least 8 characters and not be already in database
    body("username")
        .trim()
        .exists()
        .withMessage("Username is required.")
        .isLength({ min: 8 })
        .withMessage("Username must be at least 8 characters long.")
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage("Username must be alphanumeric.")
        .custom(async username => {
            const usernameAlreadyAdded = await authenticationService.usernameAlreadyAdded(username);
            if (usernameAlreadyAdded)
                throw new Error("Username already in use.");
        }),

    // Password must have at least 8 characters
    body("password")
        .trim()
        .exists()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 chars long.")
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage("Password must be alphanumeric.")
];

const updateAuthorValidator = [
    param("authorId")
        .trim()
        .exists()
        .withMessage("AuthorID is required.")
        .isMongoId()
        .withMessage("The required resource was not found."),
    // New password must have at least 8 characters
    body("newPassword")
        .trim()
        .exists()
        .withMessage("New password is required.")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 chars long.")
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage("New password must be alphanumeric.")
];

const deleteAuthorValidator = [
    param("authorId")
        .trim()
        .exists()
        .withMessage("AuthorID is required.")
        .isMongoId()
        .withMessage("The required resource was not found.")
];

module.exports = {
    getAuthorValidator,
    createAuthorValidator,
    updateAuthorValidator,
    deleteAuthorValidator
}
