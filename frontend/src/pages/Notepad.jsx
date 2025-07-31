import React, { useState, useEffect } from "react";
import NoteNavbar from "../components/NoteNavbar";
import NewNoteModal from "../components/NewNoteModal";
import NoteCard from "../components/NoteCard";
import { BiSearchAlt } from "react-icons/bi";
import "./Notepad.css";

const Notepad = () => {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API}/notes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching notes");

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNewNote = () => setShowModal(true);

  const handleSaveNote = () => {
    fetchNotes(); // Refresca la lista real sin duplicar
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setShowModal(true);
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`${API}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error deleting note");

      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      const note = notes.find((n) => n.id === id);
      const res = await fetch(`${API}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...note, archived: !note.archived }),
      });

      if (!res.ok) throw new Error("Error archiving note");

      const updated = await res.json();
      const updatedNotes = notes.map((n) => (n.id === id ? updated : n));
      setNotes(updatedNotes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const sortByPriority = (a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  };

  const filteredNotes = notes
    .filter((note) => (showArchived ? note.archived : !note.archived))
    .filter((note) => {
      const categoryName = note.category?.name || "";
      return categoryName.toLowerCase().includes(categoryFilter.toLowerCase());
    });

  return (
    <div
      style={{
        backgroundColor: "#1c1f2b",
        minHeight: "100vh",
        color: "#f5f5f5",
      }}
    >
      <NoteNavbar
        onNewNote={handleNewNote}
        onToggleArchived={() => setShowArchived(!showArchived)}
        showArchived={showArchived}
      />

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <BiSearchAlt className="icon" />
        <input
          type="text"
          placeholder="Search by category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            backgroundColor: "#2a2f3b",
            color: "#f5f5f5",
            border: "none",
            borderBottom: "2px solid #2bbead",
            padding: "8px 12px",
            borderRadius: "6px",
            outline: "none",
          }}
        />
      </div>

      <NewNoteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setNoteToEdit(null);
        }}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {filteredNotes.length === 0 ? (
          <p style={{ color: "#b0b0b0", textAlign: "center" }}>
            {showArchived
              ? "Nothing here, but every great idea starts somewhere."
              : 'A blank space... the perfect place to begin. Add notes using "+ New Note".'}
          </p>
        ) : (
          filteredNotes
            .sort(sortByPriority)
            .map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onToggleArchive={handleToggleArchive}
                onEdit={handleEditNote}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Notepad;
