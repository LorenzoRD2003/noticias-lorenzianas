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
 *     summary: Returns a list of news.
 *     description: Returns a list of news based on the conditions set on the parameters.
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
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
 */
router.get("/", newsController.getAllNewsArticles);

/**
 * @openapi
 * /news/{newsId}:
 *   get:
 *     tags:
 *       - News
 *     summary: Returns one news.
 *     description: Returns one news, searching it by ID.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         description: ID of the news
 *         required: true
 *         schema:
 *           type: string
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
 *                   $ref: "#/components/schemas/News"
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
 */
router.get("/:newsId", newsValidators.getNewsArticleValidator, newsController.getNewsArticle);

/**
 * @openapi
 * /news:
 *   post:
 *     tags:
 *       - News
 *     summary: Create a news.
 *     description: Create a news with the data sent.
 *     requestBody:
 *       description: Data to create the news.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              $ref: '#/components/schemas/News'
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
 *                   $ref: "#/components/schemas/News"
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
 */
router.post("/", newsValidators.createNewsArticleValidator, newsController.createNewsArticle);

/**
 * @openapi
 * /news/{newsId}:
 *   put:
 *     tags:
 *       - News
 *     summary: Update a news.
 *     description: Update a news with the data sent.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         description: ID of the news
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update the news.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              $ref: '#/components/schemas/News'
 *     responses:
 *       204:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
 */
router.put("/:newsId", newsValidators.updateNewsArticleValidator, newsController.updateNewsArticle);

/**
 * @openapi
 * /news/{newsId}:
 *   delete:
 *     tags:
 *       - News
 *     summary: Delete a news.
 *     description: Delete a news by ID.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         description: ID of the news
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
 */
router.delete("/:newsId", newsValidators.deleteNewsArticleValidator, newsController.deleteNewsArticle);

/**
 * @openapi
 * /news/{newsId}/author:
 *   get:
 *     tags:
 *       - News
 *     summary: Returns the author of the news.
 *     description: Searches a news by ID, and returns its author.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         description: ID of the news
 *         required: true
 *         schema:
 *           type: string
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
 *                   $ref: "#/components/schemas/Author"
 *       400:
 *         description: FAILED - Bad Request Error
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
 *                       example: "There is an error with the client data."
 *       500:
 *         description: FAILED - Internal Server Error
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
 *                       example: "An error occured in the server."
*/
router.get("/:newsId/author", newsValidators.getNewsArticleValidator, newsController.getNewsAuthor);

module.exports = router;

