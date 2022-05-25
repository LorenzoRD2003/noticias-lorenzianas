require("dotenv").config();
const express = require("express");
require("./api/database/mongoose");
const bodyParser = require("body-parser");
const { apiErrorHandler, api404Handler } = require("./api/modules/error-handler");
const { swaggerSpec } = require("./api/modules/swagger");
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Listen for the connection on this port
app.listen(PORT, () => console.log(`Corriendo en el puerto ${PORT}.`));

// Router for the news
const newsRouter = require("./api/routes/newsRoutes");
app.use("/news", newsRouter);

// Router for the authors
const authorRouter = require("./api/routes/authorRoutes");
app.use("/author", authorRouter);

// Routes to swagger documents in HTML and JSON
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Finally, check for errors and for 404
app.use(apiErrorHandler);
app.use(api404Handler);

