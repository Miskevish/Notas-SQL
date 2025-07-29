const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getNotesByCategory,
  deleteCategory,
} = require("../controllers/categoryController");


router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/notes/:id", getNotesByCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
