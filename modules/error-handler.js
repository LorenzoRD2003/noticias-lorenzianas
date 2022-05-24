class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequestError(message) {
        return new ApiError(400, message);
    }

    static unauthorizedError(message) {
        return new ApiError(401, message);
    }

    static notFoundError(message) {
        return new ApiError(404, message);
    }

    static internalServerError(message) {
        return new ApiError(500, message);
    }
}

const apiErrorHandler = (err, req, res, next) => {
    console.log(err);

    if (err instanceof ApiError)
        return res.status(err.code).send(err.message);
    else
        return res.status(500).send("Ha ocurrido un error imprevisto.");
}

module.exports = { ApiError, apiErrorHandler };
