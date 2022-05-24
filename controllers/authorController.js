const { ApiError } = require("../modules/error-handler");
const authorService = require("../services/authorService");

const getAllAuthors = async (req, res, next) => {
    try {
        const allAuthors = await authorService.getAllAuthors();
        res.status(200).send({ status: "OK", data: allAuthors });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const getAuthor = async (req, res, next) => {
    try {
        const id = req.params.authorId;
        if (!id)
            return next(ApiError.badRequestError("There is no authorId param in request."));

        const author = await authorService.getAuthor(id);
        res.status(200).send({ status: "OK", data: author });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const createAuthor = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            return next(ApiError.badRequestError("One of these keys is empty or is missing in request body: 'email', 'username', 'password'"));

        const emailAlreadyAdded = await authorService.emailAlreadyAdded(email);
        if (emailAlreadyAdded)
            return next(ApiError.badRequestError("The email is already used by another author."));

        const usernameAlreadyAdded = await authorService.usernameAlreadyAdded(username);
        if (usernameAlreadyAdded)
            return next(ApiError.badRequestError("The username is already used by another author."));

        const createdAuthor = await authorService.createAuthor(email, username, password);
        res.status(201).send({ status: "OK", data: createdAuthor });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const updateAuthorPassword = async (req, res, next) => {
    try {
        const id = req.params.authorId;
        const newPassword = req.body.newPassword;

        if (!id)
            return next(ApiError.badRequestError("There is no authorId param in request."));

        if (!newPassword)
            return next(ApiError.badRequestError("The key 'newPassword' is missing or is empty in request body."));

        await authorService.updateAuthor(id, newPassword);
        res.status(201).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const id = req.params.authorId;
        if (!id)
            return next(ApiError.badRequestError("There is no authorId param in request."));

        await authorService.deleteAuthor(id);
        res.status(200).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }

}

module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthorPassword,
    deleteAuthor
};