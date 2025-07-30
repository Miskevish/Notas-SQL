const { Note, Category } = require("../models");

const noteService = {
  getAll: async (userId) => {
    return await Note.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },

  create: async (data, userId) => {
    const { title, content, categoryId } = data;

    if (!title || !content) throw new Error("Título y contenido requeridos");

    if (categoryId) {
      const exists = await Category.findByPk(categoryId);
      if (!exists) throw new Error("La categoría seleccionada no existe.");
    }

    return await Note.create({ title, content, categoryId, userId });
  },

  update: async (id, data, userId) => {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) throw new Error("Nota no encontrada o no autorizada");

    return await note.update(data);
  },

  delete: async (id, userId) => {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) throw new Error("Nota no encontrada o no autorizada");

    await note.destroy();
  },

  toggleArchive: async (id, userId) => {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) throw new Error("Nota no encontrada o no autorizada");

    note.archived = !note.archived;
    await note.save();
    return note;
  },
};

module.exports = noteService;
