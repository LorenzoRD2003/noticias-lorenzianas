const loggedOutItems = [
    {
        "text": "Inicio",
        "link": "/"
    },
    {
        "text": "Iniciar sesión",
        "link": "/login"
    },
    {
        text: "Crear cuenta",
        link: "/register"
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
