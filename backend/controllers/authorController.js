const { v4: uuidv4 } = require('uuid');
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

        req.session.token = uuidv4();
        req.session.user = createdAuthor;
        req.session.save();

        res.status(201).send({
            status: "OK",
            data: {
                token: req.session.token,
                user: req.session.user
            }
        });
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

        const result = await authorService.login(req.body.username, req.body.password);

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
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthorPassword,
    deleteAuthor,
    getSession,
    login,
    logout
};