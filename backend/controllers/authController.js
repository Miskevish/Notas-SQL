const authService = require("../services/auth.service");

const authController = {
  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};

module.exports = authController;
