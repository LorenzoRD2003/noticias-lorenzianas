const Author = require('../models/Author');
const News = require('../models/News');

const getAllAuthors = async (limit, sortBy) => {
    return await Author
        .find()
        .limit(limit)
        .sort(sortBy);
}

const getAuthor = async id => {
    return await Author.findById(id);
}

const createAuthor = async body => {
    return await Author.create(body);
}

const updateAuthor = async (id, newPassword) => {
    await Author.findByIdAndUpdate(id, { password: newPassword });
}

const deleteAuthor = async id => {
    await Author.findByIdAndDelete(id);
}

const emailAlreadyAdded = async email => {
    const result = await Author.findOne({ email: email });
    return Boolean(result);
}

const usernameAlreadyAdded = async username => {
    const result = await Author.findOne({ username: username });
    return Boolean(result);
}


module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    emailAlreadyAdded,
    usernameAlreadyAdded
}