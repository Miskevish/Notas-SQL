const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes.controller");

router.get("/", noteController.getAll);
router.post("/", noteController.create);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.delete);
router.patch("/:id/archive", noteController.archive);
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const notes = await Note.findAll({ where: { categoryId } });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener notas por categoría" });
  }
});


module.exports = router;
