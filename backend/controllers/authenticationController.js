const { v4: uuidv4 } = require('uuid');
const { ApiError } = require("../modules/error-handler");
const { validationResult } = require("express-validator");
const authenticationService = require("../services/authenticationService");

// Check if already logged in
const getSession = (req, res, next) => {
    try {
        res.send({
            token: req.session.token,
            user: req.session.user
        });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const login = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const result = await authenticationService.login(req.body.username, req.body.password);

        if (result.error)
            next(ApiError.badRequestError(result.error));
        else {
            req.session.token = uuidv4();
            req.session.user = result;
            req.session.save();

            res.status(200).send({
                status: "OK",
                data: {
                    token: req.session.token,
                    user: req.session.user
                }
            });
        }
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const logout = (req, res, next) => {
    try {
        delete req.session.token;
        delete req.session.user;
        req.session.save();

        res.sendStatus(204);
    } catch(err) {
        next(ApiError.internalServerError(err.message));
    }
}

module.exports = {
    getSession,
    login,
    logout
}
