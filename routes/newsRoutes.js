const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();


router.get("/", newsController.getAllNewsArticles);

router.get("/:newsId", newsController.getNewsArticle);

router.post("/", newsController.createNewsArticle);

router.put("/:newsId", newsController.updateNewsArticle);

router.delete("/:newsId", newsController.deleteNewsArticle);

module.exports = router;

