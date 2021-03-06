require("dotenv").config();

const express = require("express");
const app = express();

// Use helmet module
const helmet = require("helmet");
app.use(helmet());

// Use body-parser module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the database
require("./database/mongoose");

// Listen for the connection on this port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Corriendo en el puerto ${PORT}.`));

// Set response headers
const { setHeaders } = require("./modules/set-headers");
app.use(setHeaders);

// Router for the news
const newsRouter = require("./routes/newsRoutes");
app.use("/news", newsRouter);

// Router for the authors
const authorRouter = require("./routes/authorRoutes");
app.use("/author", authorRouter);

// Router for authentication
const authenticationRouter = require("./routes/authenticationRoutes");
app.use("/auth", authenticationRouter);

// Router for the documentation
const { router: docsRouter } = require("./modules/swagger");
app.use("/api", docsRouter);

// Finally, check for errors and for 404
const { apiErrorHandler, api404Handler } = require("./modules/error-handler");
app.use(apiErrorHandler);
app.use(api404Handler);

