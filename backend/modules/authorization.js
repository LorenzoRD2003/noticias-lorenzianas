const jwt = require("jsonwebtoken");
const { ApiError } = require("../modules/error-handler");

const authorization = (req, res, next) => {
    try {
        const authorization = req.headers?.authorization;
        const token = (authorization && authorization.split(" ")[0] === "Bearer") ?
            authorization.split(" ")[1] :
            null;

        if (!token)
            next(ApiError.unauthorizedError("Token is missing."));

        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken?.id)
            next(ApiError.unauthorizedError("Token is invalid."));

        res.locals.token = decodedToken;
        next();
    } catch (err) {
        next(ApiError.unauthorizedError(err?.message));
    }
};


module.exports = {
    authorization
}
