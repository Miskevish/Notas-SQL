import React, { useState, useEffect } from "react";
import "./NewNoteModal.css";

const NewNoteModal = ({ isOpen, onClose, onSave, noteToEdit }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    categoryId: "",
    priority: "Medium",
  });

  const [categories, setCategories] = useState([]);
  const [newCategoryMode, setNewCategoryMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !Array.isArray(data)) {
          throw new Error(data.message || "Error fetching categories");
        }

        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (noteToEdit) {
      setNote({
        title: noteToEdit.title || "",
        content: noteToEdit.content || "",
        categoryId: noteToEdit.categoryId || "",
        priority: noteToEdit.priority || "Medium",
      });
    } else {
      setNote({
        title: "",
        content: "",
        categoryId: "",
        priority: "Medium",
      });
    }
  }, [noteToEdit, isOpen]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title || !note.content || (!note.categoryId && !newCategoryName))
      return;

    try {
      const token = localStorage.getItem("token");
      let categoryId = note.categoryId;

      if (newCategoryMode && newCategoryName.trim()) {
        const resCat = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newCategoryName }),
          }
        );

        const dataCat = await resCat.json();
        if (!resCat.ok || !dataCat.id) {
          alert(dataCat.message || "Error creating category");
          return;
        }

        categoryId = dataCat.id;
      }

      const method = noteToEdit ? "PUT" : "POST";
      const url = noteToEdit
        ? `${import.meta.env.VITE_API_URL}/notes/${noteToEdit.id}`
        : `${import.meta.env.VITE_API_URL}/notes`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...note,
          categoryId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error saving note");
        return;
      }

      onSave(); 
      setNote({ title: "", content: "", categoryId: "", priority: "Medium" });
      setNewCategoryMode(false);
      setNewCategoryName("");
      onClose();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Server error. Try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{noteToEdit ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSubmit} className="note-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Write your note here..."
            value={note.content}
            onChange={handleChange}
            rows="6"
            required
          />

          <select
            name="categoryId"
            value={newCategoryMode ? "new" : note.categoryId}
            onChange={(e) => {
              if (e.target.value === "new") {
                setNewCategoryMode(true);
                setNote({ ...note, categoryId: "" });
              } else {
                setNewCategoryMode(false);
                setNote({ ...note, categoryId: e.target.value });
              }
            }}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
            <option value="new">➕ Add new category...</option>
          </select>

          {newCategoryMode && (
            <input
              type="text"
              placeholder="Enter new category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
          )}

          <select
            name="priority"
            value={note.priority}
            onChange={handleChange}
            className="priority-select"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNoteModal;
