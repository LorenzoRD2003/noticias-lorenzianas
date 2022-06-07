const { ApiError } = require("../modules/error-handler");
const { validationResult } = require("express-validator");
const authorService = require("../services/authorService");

const getAllAuthors = async (req, res, next) => {
    try {
        // limit param (or limit is 10000 authors)
        const limit = req.query.limit || 10000;
        const sortBy = req.query.sort || "-updatedAt";

        const allAuthors = await authorService.getAllAuthors(limit, sortBy);
        res.status(200).send({ status: "OK", data: allAuthors });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const getAuthor = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const author = await authorService.getAuthor(req.params.authorId);
        res.status(200).send({ status: "OK", data: author });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const createAuthor = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const createdAuthor = await authorService.createAuthor(req.body);
        res.status(201).send({ status: "OK", data: createdAuthor });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const updateAuthorPassword = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        await authorService.updateAuthor(req.params.authorId, req.body.newPassword);
        res.status(204).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        await authorService.deleteAuthor(req.params.authorId);
        res.status(204).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const login = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const loggedIn = await authorService.login(req.body.username, req.body.password);
        res.status(200).send({ status: "OK", data: loggedIn });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthorPassword,
    deleteAuthor,
    login
};