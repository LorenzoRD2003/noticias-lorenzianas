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

const updateAuthor = async (id, newPassword, token) => {
    const author = await Author.findById(id);
    if (author._id?.toString() !== token.id)
       return; 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Author.findByIdAndUpdate(id, { password: hashedPassword });
}

const deleteAuthor = async (id, token) => {
    const author = await Author.findById(id);
    if (author._id?.toString() !== token.id)
       return; 

    await Author.findByIdAndDelete(id);
}

module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}