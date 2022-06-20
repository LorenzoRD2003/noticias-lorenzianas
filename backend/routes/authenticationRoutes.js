const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const authenticationValidators = require('../validators/authenticationValidators');

const router = express.Router();

router.post("/login", authenticationValidators.loginValidator, authenticationController.login);

module.exports = router;
