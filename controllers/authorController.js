const authorService = require("../services/authorService");

const getAllAuthors = async (req, res) => {
    const allAuthors = await authorService.getAllAuthors();
    res.status(200).send({ status: "OK", data: allAuthors });
}

const getAuthor = async (req, res) => {
    const id = req.params.authorId;
    if (!id)
        return;
    
    const author = await authorService.getAuthor(id);
    res.status(200).send({ status: "OK", data: author });
}

const createAuthor = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
        return;

    const createdAuthor = await authorService.createAuthor(email, username, password);
    res.status(201).send({ status: "OK", data: createdAuthor});
}

const updateAuthorPassword = async (req, res) => {
    const id = req.params.authorId;
    const newPassword = req.body.newPassword;

    if (!id || !newPassword)
        return;

    await authorService.updateAuthor(id, newPassword);
    res.status(201).send({ status: "OK" });
}

const deleteAuthor = async (req, res) => {
    const id = req.params.authorId;
    if (!id)
        return;
    
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