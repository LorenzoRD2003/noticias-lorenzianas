const loggedOutItems = [
    {
        "text": "Inicio",
        "link": "/"
    },
    {
        "text": "Iniciar sesión",
        "link": "/login"
    }
];

const loggedInItems = [
    {
        "text": "Inicio",
        "link": "/"
    },
    {
        "text": "Cerrar sesión",
        "link": "/logout"
    },
    {
        "text": "Mi perfil",
        "link": "/profile"
    },
    {
        "text": "Publicar noticia",
        "link": "/publish"
    }
];

module.exports = {
    loggedOutItems,
    loggedInItems
}
