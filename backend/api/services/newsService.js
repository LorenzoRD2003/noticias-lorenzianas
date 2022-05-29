const mongoose = require("mongoose");
const News = require("../models/News");
const Author = require("../models/Author");

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
    body.author = mongoose.Types.ObjectId(body.author);
    console.log(body);
    const createdNews = await News.create(body);

    const author = await Author.findById(body.author);
    author.news.push(createdNews);
    author.save();

    return createdNews;
}

const updateNewsArticle = async (id, body) => {
    await News.findByIdAndUpdate(id, body);
}

const deleteNewsArticle = async id => {
    await News.findByIdAndDelete(id);
}

const getNewsAuthor = async id => {
    const news = await News
        .findById(id)
        .populate("author")

    return news.author;
}

module.exports = {
    getAllNewsArticles,
    getNewsArticle,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    getNewsAuthor
}
