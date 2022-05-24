const News = require("../database/News");

const getAllNewsArticles = async (query, limit, sortBy) => {
    return await News
        .find(query)
        .limit(limit)
        .sort(sortBy);
}

const getNewsArticle = async id => {
    return await News.findById(id);
}

const createNewsArticle = async body => {
    return await News.create(body);
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
