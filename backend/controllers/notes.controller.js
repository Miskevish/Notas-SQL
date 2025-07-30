const noteService = require("../services/notes.service");
const { Note } = require("../models");

const noteController = {
  getAll: async (req, res) => {
    try {
      const notes = await noteService.getAll(req.user.id);
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const newNote = await noteService.create(req.body, req.user.id);
      res.status(201).json(newNote);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await noteService.update(id, req.body, req.user.id);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await noteService.delete(id, req.user.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  archive: async (req, res) => {
    try {
      const { id } = req.params;
      const archived = await noteService.toggleArchive(id, req.user.id);
      res.json(archived);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const notes = await Note.findAll({
        where: { categoryId, userId: req.user.id },
      });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener notas por categoría" });
    }
  },
};

module.exports = noteController;
