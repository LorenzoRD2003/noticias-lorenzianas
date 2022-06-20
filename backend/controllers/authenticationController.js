const { ApiError } = require("../modules/error-handler");
const { validationResult } = require("express-validator");
const authenticationService = require("../services/authenticationService");
const jwt = require("jsonwebtoken");


const login = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const result = await authenticationService.login(req.body.username, req.body.password);

        if (result.error)
            return next(ApiError.badRequestError(result.error));
        
        const token = jwt.sign(result, process.env.SECRET, {
            expiresIn: "1h" // 1 hour
        });

        res.status(200).send({
            status: "OK",
            data: {
                token,
                user: result
            }
        });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

module.exports = {
    login
}
