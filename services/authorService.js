const Author = require('../models/Author');

const getAllAuthors = async () => {
    const allAuthors = await Author.find();
    return allAuthors;
}

const getAuthor = async id => {
    const author = await Author.findById(id);
    return author;
}

const createAuthor = async body => {
    const newAuthor = await Author.create(body);
    return newAuthor;
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