import React from "react";
import "./NoteCard.css";
import { LuPencilLine } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";
import { CiInboxIn } from "react-icons/ci";
import { CiInboxOut } from "react-icons/ci";

const NoteCard = ({ note, onDelete, onToggleArchive, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#C75656";
      case "Medium":
        return "#ffc107";
      case "Low":
      default:
        return "#B0B0B0";
    }
  };

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">
        {note.content.length > 120
          ? `${note.content.slice(0, 120)}...`
          : note.content}
      </p>

      <span className="note-category">
        {note.category?.name || "No Category"}
      </span>

      {note.priority && (
        <span
          className="note-priority"
          style={{ color: getPriorityColor(note.priority), fontWeight: "bold" }}
        >
          Priority: {note.priority}
        </span>
      )}

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          <LuPencilLine />
        </button>
        <button
          className="archive-btn"
          onClick={() => onToggleArchive(note.id)}
        >
          {note.archived ? <CiInboxOut /> : <CiInboxIn />}
        </button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
