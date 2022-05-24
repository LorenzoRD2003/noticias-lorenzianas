const express = require('express');
const newsController = require('../controllers/newsController');
const newsValidators = require('../validators/newsValidators');

const router = express.Router();


router.get("/", newsController.getAllNewsArticles);

router.get("/:newsId", newsValidators.getNewsArticleValidator, newsController.getNewsArticle);

router.post("/", newsValidators.createNewsArticleValidator, newsController.createNewsArticle);

router.put("/:newsId", newsValidators.updateNewsArticleValidator, newsController.updateNewsArticle);

router.delete("/:newsId", newsValidators.deleteNewsArticleValidator, newsController.deleteNewsArticle);

router.get("/:newsId/author", newsValidators.getNewsArticleValidator, newsController.getNewsAuthor);

module.exports = router;

