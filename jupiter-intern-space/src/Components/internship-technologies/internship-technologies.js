import React, { useState, useEffect } from "react";
import "./internship-technologies.css";
import Navbar from "../navbar/navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/internship-technologies";

const InternshipTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setTechnologies(response.data);
    } catch (error) {
      console.error("Failed to fetch technologies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${editingId}`, {
          id: editingId,
          ...formData,
        });
      } else {
        await axios.post(`${API_BASE_URL}/create`, formData);
      }
      await fetchTechnologies();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving technology:", error);
    }
  };

  const handleDeleteTechnology = async (id) => {
    if (window.confirm("Are you sure you want to delete this technology?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        await fetchTechnologies();
      } catch (error) {
        console.error("Error deleting technology:", error);
      }
    }
  };

  const handleUpdateTechnology = (tech) => {
    setFormData({
      name: tech.name,
      description: tech.description,
      status: tech.status,
    });
    setIsEditing(true);
    setEditingId(tech.id);
    setIsModalOpen(true);
  };

  const handleAddTechnology = () => {
    setFormData({
      name: "",
      description: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      description: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredTechnologies = technologies.filter((tech) =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="internship-technologies-layout">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Internship Technologies</h1>
          <button className="add-btn" onClick={handleAddTechnology}>
            Add Technology
          </button>
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by Technology Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Technology Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnologies.map((tech) => (
              <tr key={tech.id}>
                <td>{tech.name}</td>
                <td>{tech.description}</td>
                <td>{tech.status}</td>
                <td>
                  <button
                    className="action-btn update-btn"
                    onClick={() => handleUpdateTechnology(tech)}
                  >
                    Update
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteTechnology(tech.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{isEditing ? "Update Technology" : "Add New Technology"}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Technology Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div> */}
                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipTechnologies;
