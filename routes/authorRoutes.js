const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();


router.get("/", authorController.getAllAuthors);

router.get("/:authorId", authorController.getAuthor);

router.post("/", authorController.createAuthor);

router.put("/:authorId", authorController.updateAuthorPassword);

router.delete("/:authorId", authorController.deleteAuthor);

module.exports = router;