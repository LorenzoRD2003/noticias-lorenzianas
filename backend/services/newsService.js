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
    const news = await News.findById(id);
    
    // Add one new view
    news.views++;
    news.save();
    
    return news;
}

const createNewsArticle = async (body, token) => {
    const author = await Author.findById(body.author);
    if (!author._id?.toString() !== token.id)
        return;
    
    body.author = mongoose.Types.ObjectId(body.author);
    const createdNews = await News.create(body);
    
    author.news.push(createdNews);
    author.save();

    return createdNews;
}

const updateNewsArticle = async (id, body, token) => {
    const news = await News.findById(id);
    if (news.author?.toString() !== token.id)
        return;

    await News.findByIdAndUpdate(id, body);
}

const deleteNewsArticle = async (id, token) => {
    const news = await News.findById(id);
    if (news.author?.toString() !== token.id)
        return;

    await News.findByIdAndDelete(id);
}

const getNewsAuthor = async id => {
    const news = await News
        .findById(id)
        .populate("author", "username");

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
