const { body } = require('express-validator');

const loginValidator = [
    // Username must have at least 8 characters
    body("username")
        .trim()
        .exists()
        .withMessage("Username is required.")
        .isLength({ min: 8 })
        .withMessage("Username must be at least 8 characters long.")
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage("Username must be alphanumeric."),
    
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

module.exports = {
    loginValidator
}