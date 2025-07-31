import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NoteNavbar.css";
import logo from "../assets/logo1.png";

const NoteNavbar = ({ onNewNote, onToggleArchived, showArchived }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToNotepad = () => {
    navigate("/notepad");
  };

  return (
    <nav className="note-navbar">
      <div
        className="note-navbar-left"
        onClick={goToNotepad}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="NoteVault Logo" className="note-navbar-logo" />
      </div>

      <div
        className={`note-navbar-right ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <button className="note-navbar-btn" onClick={onNewNote}>
          + New Note
        </button>
        <button className="note-navbar-btn" onClick={onToggleArchived}>
          {showArchived ? "Hide archived" : "Show archived"}
        </button>
        <button className="note-navbar-btn logout" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default NoteNavbar;
