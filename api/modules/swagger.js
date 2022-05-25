const swaggerJSDoc = require('swagger-jsdoc');

// API Metadata
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Noticias Lorenzianas",
            version: "1.0.0",
            description: "API para el futuro sitio web de Noticias Lorenzianas."
        },
    },
    apis: ["../routes*.js"]
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
