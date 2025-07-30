const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", noteController.getAll);
router.post("/", noteController.create);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.delete);
router.patch("/:id/archive", noteController.archive);
router.get("/category/:categoryId", noteController.getByCategory);

module.exports = router;
