const { ApiError } = require("../modules/error-handler");
const newsService = require("../services/newsService");

const getAllNewsArticles = async (req, res, next) => {
    try {
        // I want to check only these params
        const queryArray = Object.entries(req.query);
        const paramsToCheck = queryArray.filter(([key, value]) => key == "author" || key == "category");
        const query = Object.fromEntries(paramsToCheck);

        // limit param (or limit is 10000 news)
        const limit = req.query.limit || 10000;
        const sortBy = req.query.sort || "-updatedAt";

        const allNewsArticles = await newsService.getAllNewsArticles(query, limit, sortBy);
        res.status(200).send({ status: "OK", data: allNewsArticles });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const getNewsArticle = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const newsArticle = await newsService.getNewsArticle(id);
        res.status(200).send({ status: "OK", data: newsArticle });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const createNewsArticle = async (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        const createdNewsArticle = await newsService.createNewsArticle(req.body);
        res.status(201).send({ status: "OK", data: createdNewsArticle });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const updateNewsArticle = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        await newsService.updateNewsArticle(id, req.body);
        res.status(201).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const deleteNewsArticle = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
            return next(ApiError.badRequestError(validationErrors.array()));

        await newsService.deleteNewsArticle(id);
        res.status(200).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

module.exports = {
    getAllNewsArticles,
    getNewsArticle,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle
};
