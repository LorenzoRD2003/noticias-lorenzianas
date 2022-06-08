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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Author.findByIdAndUpdate(id, { password: hashedPassword });
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

    if (!author)
        return { error: "El nombre de usuario ingresado no existe." }

    const result = await bcrypt.compare(password, author.password);
    
    if (result) {
        author.password = "";
        return author;
    } else
        return { error: "La contraseña es incorrecta." }
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