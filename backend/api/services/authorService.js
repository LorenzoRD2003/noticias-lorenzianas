const Author = require('../models/Author');
const bcrypt = require('bcrypt');

const getAllAuthors = async (limit, sortBy) => {
    return await Author
        .find()
        .limit(limit)
        .sort(sortBy);
}

const getAuthor = async id => {
    return await Author
        .findById(id)
        .populate({
            path: "news",
            select: "_id headline createdAt",
            options: { sort: "-createdAt" }
        });
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

const login = async (username, password) => {
    const author = await Author
        .findOne({ username: username })
        .select("+password");
    
    return await bcrypt.compare(password, author.password);
}


module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    emailAlreadyAdded,
    usernameAlreadyAdded,
    login
}