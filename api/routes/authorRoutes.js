const express = require('express');
const authorController = require('../controllers/authorController');
const authorValidators = require('../validators/authorValidators');

const router = express.Router();

/**
 * @openapi
 * /author:
 *   get:
 *     tags:
 *       - Author
 *     summary: Returns a list of authors.
 *     description: Returns a list of news based on the conditions set on the parameters.
 *     parameters:
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
 *                     $ref: "#/components/schemas/Author"
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
router.get("/", authorController.getAllAuthors);

/**
 * @openapi
 * /author/{authorId}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Returns one author.
 *     description: Returns one author, searching it by ID.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the author.
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
 * 
 */
router.get("/:authorId", authorValidators.getAuthorValidator, authorController.getAuthor);

/**
 * @openapi
 * /author:
 *   post:
 *     tags:
 *       - Author
 *     summary: Create an author.
 *     description: Create an author with the data sent.
 *     requestBody:
 *       description: Data to create the author.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              $ref: '#/components/schemas/Author'
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
router.post("/", authorValidators.createAuthorValidator, authorController.createAuthor);

/**
 * @openapi
 * /author/{authorId}:
 *   put:
 *     tags:
 *       - Author
 *     summary: Update an author.
 *     description: Update an author with the data sent.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the author.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update the author.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              $ref: '#/components/schemas/Author'
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
router.put("/:authorId", authorValidators.updateAuthorValidator, authorController.updateAuthorPassword);

/**
 * @openapi
 * /author/{authorId}:
 *   delete:
 *     tags:
 *       - Author
 *     summary: Delete an author.
 *     description: Delete an author with the data sent.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the author.
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
router.delete("/:authorId", authorValidators.deleteAuthorValidator, authorController.deleteAuthor);

module.exports = router;