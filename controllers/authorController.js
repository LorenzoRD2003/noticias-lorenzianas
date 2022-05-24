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

const getAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        if (!id)
            return;

        const author = await authorService.getAuthor(id);
        res.status(200).send({ status: "OK", data: author });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const createAuthor = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            return;

        const createdAuthor = await authorService.createAuthor(email, username, password);
        res.status(201).send({ status: "OK", data: createdAuthor });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const updateAuthorPassword = async (req, res) => {
    try {
        const id = req.params.authorId;
        const newPassword = req.body.newPassword;

        if (!id || !newPassword)
            return;

        await authorService.updateAuthor(id, newPassword);
        res.status(201).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        if (!id)
            return;

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