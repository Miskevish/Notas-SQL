const { Category, Note } = require("../models");

const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id; 
    const categories = await Category.findAll({
      where: { userId },
    });
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener categorías", error: err });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; 

    if (!name || !userId) {
      return res.status(400).json({ message: "Nombre o userId faltante" });
    }

    const existing = await Category.findOne({
      where: { name, userId },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "La categoría ya existe para este usuario" });
    }

    const newCategory = await Category.create({ name, userId });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Error al crear categoría", error: err });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({
      where: { id, userId },
    });

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const notes = await Note.findAll({
      where: { categoryId: id, userId },
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener notas por categoría" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({
      where: { id, userId },
    });

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await category.destroy();
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar categoría", error: err });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getNotesByCategory,
  deleteCategory,
};
