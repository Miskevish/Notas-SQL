const { Category, Note } = require("../models");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
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
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Error al crear categoría", error: err });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const notes = await Note.findAll({
      where: { categoryId: id },
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

    const category = await Category.findByPk(id);
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
