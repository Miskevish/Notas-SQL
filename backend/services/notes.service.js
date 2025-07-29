const { Note, Category } = require("../models");

const noteService = {
  getAll: async () => {
    return await Note.findAll({ order: [["createdAt", "DESC"]] });
  },

  create: async (data) => {
    const { title, content, categoryId } = data;

    if (!title || !content) throw new Error("Título y contenido requeridos");

    if (categoryId) {
      const exists = await Category.findByPk(categoryId);
      if (!exists) throw new Error("La categoría seleccionada no existe.");
    }

    return await Note.create({ title, content, categoryId });
  },

  update: async (id, data) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error("Nota no encontrada");

    return await note.update(data);
  },

  delete: async (id) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error("Nota no encontrada");

    await note.destroy();
  },

  toggleArchive: async (id) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error("Nota no encontrada");

    note.archived = !note.archived;
    await note.save();
    return note;
  },
};

module.exports = noteService;
