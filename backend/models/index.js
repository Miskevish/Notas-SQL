const sequelize = require("./db");
const Note = require("./Note");
const Category = require("./Category");
const User = require("./User");

Note.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Note, { foreignKey: "userId" });

Category.hasMany(Note, { foreignKey: "categoryId" });
Note.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = {
  sequelize,
  Note,
  Category,
  User,
};
