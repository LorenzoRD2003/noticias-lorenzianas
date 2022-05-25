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

router.post("/", authorValidators.createAuthorValidator, authorController.createAuthor);

router.put("/:authorId", authorValidators.updateAuthorValidator, authorController.updateAuthorPassword);

router.delete("/:authorId", authorValidators.deleteAuthorValidator, authorController.deleteAuthor);

module.exports = router;