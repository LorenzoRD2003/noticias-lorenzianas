const authorService = require("../services/authorService");

const getAllAuthors = async (req, res) => {
    const allAuthors = await authorService.getAllAuthors();
    res.status(200).send({ status: "OK", data: allAuthors });
}

const getAuthor = async (req, res) => {
    if (!req.params.authorId)
        return;

    const id = req.params.authorId;
    const author = await authorService.getAuthor(id);
    res.status(200).send({ status: "OK", data: author });
}

const createAuthor = async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password)
        return;

    const { email, username, password } = req.body;
    const createdAuthor = await authorService.createAuthor(email, username, password);
    res.status(201).send({ status: "OK", data: createdAuthor});
}

const updateAuthorPassword = async (req, res) => {
    if (!req.params.authorId || !req.body.newPassword)
        return;

    const id = req.params.authorId;
    const newPassword = req.body.newPassword;
    await authorService.updateAuthor(id, newPassword);
    res.status(201).send({ status: "OK" });
}

const deleteAuthor = async (req, res) => {
    if (!req.params.authorId)
        return;
    
    const id = req.params.authorId;
    await authorService.deleteAuthor(id);
    res.status(200).send({ status: "OK" });
}

module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthorPassword,
    deleteAuthor
};