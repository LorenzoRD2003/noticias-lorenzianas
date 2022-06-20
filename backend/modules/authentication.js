const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { ApiError } = require("./error-handler");
const authenticationService = require("../services/authenticationService");

const login = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const result = await authenticationService.login(req.body.username, req.body.password);

        if (result.error)
            return next(ApiError.badRequestError(result.error));

        res.locals.result = result;
        next();
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const authorization = (req, res, next) => {
    try {
        const authorization = req.headers?.authorization;
        const token = (authorization && authorization.split(" ")[0] === "Bearer") ?
            authorization.split(" ")[1] :
            null;

        if (!token)
            return next(ApiError.unauthorizedError("Token is missing."));

        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken?.id)
            return next(ApiError.unauthorizedError("Token is invalid."));

        res.locals.token = decodedToken;
        next();
    } catch (err) {
        next(ApiError.unauthorizedError(err?.message));
    }
};

const getNewToken = (req, res, next) => {
    try {
        // Object is on res.locals.result if doing login
        // Object is on req.body if refreshing
        const object = res.locals.result || req.body;
        if (!object)
            return next(ApiError.badRequestError("Object for creating token is missing."));

        const token = jwt.sign(res.locals.result || req.body, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 7 * 24 * 60 * 60 // 1 week
        });

        res.status(200).send({
            status: "OK",
            data: {
                token,
                user: res.locals.result || null
            }
        });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

module.exports = {
    login,
    authorization,
    getNewToken
}
