require("dotenv").config();
const express = require("express");
require("./database/mongoose");
const bodyParser = require("body-parser");
const { ApiError, apiErrorHandler } = require("./modules/error-handler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiErrorHandler);

app.listen(PORT, () => console.log(`Corriendo en el puerto ${PORT}`));

// Router for the news
const newsRouter = require("./routes/newsRoutes");
app.use("/news", newsRouter);

// Router for the authors
const authorRouter = require("./routes/authorRoutes");
app.use("/author", authorRouter);

// Finally, check for errors
app.use(apiErrorHandler);

