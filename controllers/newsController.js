const { ApiError } = require("../modules/error-handler");
const newsService = require("../services/newsService");

const getAllNewsArticles = async (req, res, next) => {
    try {
        const allNewsArticles = await newsService.getAllNewsArticles();
        res.status(200).send({ status: "OK", data: allNewsArticles });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const getNewsArticle = async (req, res, next) => {
    try {
        const id = req.params.newsId;
        if (!id)
            return next(ApiError.badRequestError("There is no newsId param in request."));

        const newsArticle = await newsService.getNewsArticle(id);
        res.status(200).send({ status: "OK", data: newsArticle });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const createNewsArticle = async (req, res) => {
    try {
        const { headline, body, lead, author, category, tags, image } = req.body;
        if (!headline || !body || !lead || !author || !category || !tags || !image)
            return next(ApiError.badRequestError("One of these keys is empty or is missing in request body: 'headline', 'body', 'lead', 'author', 'category', 'tags', 'image'"));

        const createdNewsArticle = await newsService.createNewsArticle(req.body);
        res.status(201).send({ status: "OK", data: createdNewsArticle });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const updateNewsArticle = async (req, res, next) => {
    try {
        const id = req.params.newsId;
        if (!id)
            return next(ApiError.badRequestError("There is no newsId param in request."));

        await newsService.updateNewsArticle(id, req.body);
        res.status(201).send({ status: "OK" });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
    }
}

const deleteNewsArticle = async (req, res, next) => {
    try {
        const id = req.params.newsId;
        if (!id)
            return next(ApiError.badRequestError("There is no newsId param in request."));

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
