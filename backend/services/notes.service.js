const Note = require("../models/Note");

const noteService = {
  getAll: async () => {
    return await Note.findAll({ order: [["createdAt", "DESC"]] });
  },

  create: async (data) => {
    const { title, content } = data;
    if (!title || !content) throw new Error("Título y contenido requeridos");
    return await Note.create({ title, content });
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
