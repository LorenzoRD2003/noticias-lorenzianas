const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const authenticationValidators = require('../validators/authenticationValidators');

const router = express.Router();

router.get("/", authenticationController.getSession);

router.post("/login", authenticationValidators.loginValidator, authenticationController.login);

router.get("/logout", authenticationController.logout);

module.exports = router;
