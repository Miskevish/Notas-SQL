import React, { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          repeatPassword: formData.repeatPassword, 
          acceptedTerms: formData.termsAccepted, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        termsAccepted: false,
      });
      setError("");
      onClose();
    } catch (error) {
      setError("Server error. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="text-color">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="User"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={20}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            minLength={15}
            maxLength={50}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <span>I agree to the terms and conditions</span>
          </label>

          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
