require("dotenv").config();
const express = require("express");
require("./api/database/mongoose");
const bodyParser = require("body-parser");
const { apiErrorHandler, api404Handler } = require("./api/modules/error-handler");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Router for the documentation
const { router: docsRouter } = require("./api/modules/swagger");
app.use("/api", docsRouter);

// Finally, check for errors and for 404
app.use(apiErrorHandler);
app.use(api404Handler);

