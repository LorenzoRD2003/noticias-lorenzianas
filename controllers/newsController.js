const newsService = require("../services/newsService");

const getAllNewsArticles = (req, res) => {
    const allNewsArticles = newsService.getAllNewsArticles();
    res.send("Get all news articles.");
}

const getNewsArticle = (req, res) => {
    const newsArticle = newsService.getNewsArticle();
    res.send("Get an existing news article.");
}

const createNewsArticle = (req, res) => {
    const createdNewsArticle = newsService.createNewsArticle();
    res.send("Create a news article.");
}

const updateNewsArticle = (req, res) => {
    const updatedNewsArticle = newsService.createdNewsArticle();
    res.send("Update an existing news article.");
}

const deleteNewsArticle = (req, res) => {
    newsService.deleteNewsArticle();
    res.send("Delete an existing news article.");
}

module.exports = {
    getAllNewsArticles,
    getNewsArticle,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle
};
