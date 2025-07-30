const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./User");

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
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
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

Note.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = Note;
