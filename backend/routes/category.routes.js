const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllCategories,
  createCategory,
  getNotesByCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", authMiddleware, getAllCategories);
router.post("/", authMiddleware, createCategory);
router.get("/notes/:id", authMiddleware, getNotesByCategory);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;
