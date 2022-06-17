const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

// API Metadata
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Noticias Lorenzianas",
            version: "1.0.0",
            description: "API para el futuro sitio web de Noticias Lorenzianas.",
            contact: {
                name: "Lorenzo Ruiz Díaz",
                email: "lorenzoruizdiaz2003@gmail.com"
            }
        },
    },
    apis: ["./api/routes/*.js", "./api/models/*.js"]
}

const swaggerSpec = swaggerJSDoc(options);

// Routes to swagger documents in HTML and JSON
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

module.exports = { router };
