const alphanumericRegex = /^[A-Za-z0-9_]+$/;
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]+)\])/;

const emailValidation = (email, messages) => {
    email = email.trim();

    if (!email)
        messages.push("Debe ingresar un email.");
    
    if (!emailRegex.test(email))
        messages.push("El email ingresado no es correcto.")
}

const usernameValidation = (username, messages) => {
    username = username.trim();

    if (!username)
        messages.push("Debe ingresar un nombre de usuario.");

    if (username.length < 8)
        messages.push("El nombre de usuario debe tener al menos 8 caracteres.");

    if (!alphanumericRegex.test(username))
        messages.push("El nombre de usuario debe ser alfanumérico.");
}

const passwordValidation = (password, repeatPassword, messages) => {
    password = password.trim();
    repeatPassword = repeatPassword.trim();

    if (!password)
        messages.push("Debe ingresar una contraseña.");

    if (password.length < 8)
        messages.push("La contraseña debe tener al menos 8 caracteres.");

    if (!alphanumericRegex.test(password))
        messages.push("La contraseña debe ser alfanumérica.");
    
    if (password !== repeatPassword)
        messages.push("Las contraseñas no son iguales.");
};

const authorValidation = (email, username, password, repeatPassword) => {
    const messages = [];

    emailValidation(email, messages);
    usernameValidation(username, messages);
    passwordValidation(password, repeatPassword, messages);

    return messages;
}

export default authorValidation;

