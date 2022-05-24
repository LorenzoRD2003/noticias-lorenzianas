const News = require("../database/News");

const getAllNewsArticles = async () => {
    const allNewsArticles = await News.find();
    return allNewsArticles;
}

const getNewsArticle = async id => {
    const newsArticle = await News.findById(id);
    return newsArticle;
}

const createNewsArticle = async body => {
    const newsArticle = await News.create(body);
    return newsArticle;
}

const updateNewsArticle = async (id, body) => {
    await News.findByIdAndUpdate(id, body);
}

const deleteNewsArticle = async id => {
    await News.findByIdAndDelete(id);
}

module.exports = {
    getAllNewsArticles,
    getNewsArticle,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle
}
