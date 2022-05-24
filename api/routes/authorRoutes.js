const express = require('express');
const authorController = require('../controllers/authorController');
const authorValidators = require('../validators/authorValidators');

const router = express.Router();

router.get("/", authorController.getAllAuthors);

router.get("/:authorId", authorValidators.getAuthorValidator, authorController.getAuthor);

router.post("/", authorValidators.createAuthorValidator, authorController.createAuthor);

router.put("/:authorId", authorValidators.updateAuthorValidator, authorController.updateAuthorPassword);

router.delete("/:authorId", authorValidators.deleteAuthorValidator, authorController.deleteAuthor);

router.get("/:authorId/news", authorValidators.getAuthorValidator, authorController.getNewsByAuthor);

module.exports = router;