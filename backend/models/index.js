const sequelize = require("./db");
const Note = require("./Note");
const Category = require("./Category");

Category.hasMany(Note, { foreignKey: "categoryId" });
Note.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = {
  sequelize,
  Note,
  Category,
};

