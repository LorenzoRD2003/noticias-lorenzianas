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
 *                       example: "Some error message."
 */
router.get("/", authorController.getAllAuthors);

router.get("/:authorId", authorValidators.getAuthorValidator, authorController.getAuthor);

router.post("/", authorValidators.createAuthorValidator, authorController.createAuthor);

router.put("/:authorId", authorValidators.updateAuthorValidator, authorController.updateAuthorPassword);

router.delete("/:authorId", authorValidators.deleteAuthorValidator, authorController.deleteAuthor);

module.exports = router;