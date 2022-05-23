const authorService = require("../services/authorService");

const getAllAuthors = (req, res) => {
    const allAuthors = authorService.getAllAuthors();
    res.send("Get all authors.");
}

const getAuthor = (req, res) => {
    const author = authorService.getAuthor();
    res.send("Get an existing author.");
}

const createAuthor = (req, res) => {
    const createdAuthor = authorService.createAuthor();
    res.send("Create an author.");
}

const updateAuthor = (req, res) => {
    const updatedAuthor = authorService.updateAuthor();
    res.send("Update an existing author.");
}

const deleteAuthor = (req, res) => {
    authorService.deleteAuthor();
    res.send("Delete an existing author.");
}

module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};