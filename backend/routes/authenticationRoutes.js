const express = require('express');
const { login, getNewToken } = require('../modules/authentication');
const authenticationValidators = require('../validators/authenticationValidators');

const router = express.Router();

router.post("/login", authenticationValidators.loginValidator, login, getNewToken);

router.put("/refresh", getNewToken);

module.exports = router;
