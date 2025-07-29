const noteService = require("../services/notes.service");

const noteController = {
  getAll: async (req, res) => {
    const notes = await noteService.getAll();
    res.json(notes);
  },

  create: async (req, res) => {
    const newNote = await noteService.create(req.body);
    res.status(201).json(newNote);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const updated = await noteService.update(id, req.body);
    res.json(updated);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await noteService.delete(id);
    res.status(204).send();
  },

  archive: async (req, res) => {
    const { id } = req.params;
    const archived = await noteService.toggleArchive(id);
    res.json(archived);
  },
};

module.exports = noteController;
