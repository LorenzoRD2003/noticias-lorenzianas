const Author = require('../models/Author');
const bcrypt = require('bcrypt');

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
        return {
            id: author._id,
            username: author.username
        };
    } else
        return { error: "La contraseña es incorrecta." }
}

module.exports = {
    emailAlreadyAdded,
    usernameAlreadyAdded,
    login
}