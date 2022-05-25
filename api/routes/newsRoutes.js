const express = require('express');
const newsController = require('../controllers/newsController');
const newsValidators = require('../validators/newsValidators');

const router = express.Router();

/**
 * @openapi
 * /news:
 *   get:
 *     tags:
 *       - News
 *     parameters:
 *       - in: query
 *         name: author
 *         description: ID of the author of the news.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         description: Category of the news.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Limit of news to get.
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         description: Variable to use in order to sort the news array.
 *         required: false
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/News"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get("/", newsController.getAllNewsArticles);

router.get("/:newsId", newsValidators.getNewsArticleValidator, newsController.getNewsArticle);

router.post("/", newsValidators.createNewsArticleValidator, newsController.createNewsArticle);

router.put("/:newsId", newsValidators.updateNewsArticleValidator, newsController.updateNewsArticle);

router.delete("/:newsId", newsValidators.deleteNewsArticleValidator, newsController.deleteNewsArticle);

router.get("/:newsId/author", newsValidators.getNewsArticleValidator, newsController.getNewsAuthor);

module.exports = router;

