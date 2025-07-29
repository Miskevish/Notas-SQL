require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const noteRoutes = require("./routes/notes.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("🔗 Base de datos conectada con Sequelize");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
