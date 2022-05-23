const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Corriendo en el puerto ${PORT}`));

// Router for the news
const newsRouter = require("./routes/newsRoutes");
app.use("/news", newsRouter);


