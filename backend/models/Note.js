const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./User");
const Category = require("./Category"); 

const Note = sequelize.define(
  "Note",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM("High", "Medium", "Low"),
      allowNull: false,
      defaultValue: "Medium",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "notes",
    timestamps: true,
  }
);

User.hasMany(Note, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Note.belongsTo(Category, {
  as: "category", 
  foreignKey: "categoryId",
});

module.exports = Note;
