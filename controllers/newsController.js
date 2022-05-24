const newsService = require("../services/newsService");

const getAllNewsArticles = async (req, res) => {
    const allNewsArticles = await newsService.getAllNewsArticles();
    res.status(200).send({ status: "OK", data: allNewsArticles });
}

const getNewsArticle = async (req, res) => {
    const id = req.params.newsId;
    if (!id)
        return;
    
    const newsArticle = await newsService.getNewsArticle(id);
    res.status(200).send({ status: "OK", data: newsArticle });
}

const createNewsArticle = async (req, res) => {
    const { headline, body, lead, author, category, tags, image } = req.body;
    if (!headline || !body || !lead || !author || !category || !tags || !image)
        return;

    const createdNewsArticle = await newsService.createNewsArticle(req.body);
    res.status(201).send({ status: "OK", data: createdNewsArticle });
}

const updateNewsArticle = async (req, res) => {
    const id = req.params.newsId;
    if (!id)
        return;

    await newsService.updateNewsArticle(id, req.body);
    res.status(201).send({ status: "OK" });
}

const deleteNewsArticle = async (req, res) => {
    const id = req.params.newsId;
    if (!id)
        return;

    await newsService.deleteNewsArticle(id);
    res.status(200).send({ status: "OK" });
}

module.exports = {
    getAllNewsArticles,
    getNewsArticle,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle
};
