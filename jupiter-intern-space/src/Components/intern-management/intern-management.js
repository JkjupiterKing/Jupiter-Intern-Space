import React, { useState, useEffect } from "react";
import "./intern-management.css";
import Navbar from "../navbar/navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/interns";

const InternManagement = () => {
  const [interns, setInterns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    year: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setInterns(response.data);
    } catch (error) {
      console.error("Failed to fetch interns:", error);
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
      await fetchInterns();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving intern:", error);
    }
  };

  const handleDeleteIntern = async (id) => {
    if (window.confirm("Are you sure you want to delete this intern?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        await fetchInterns();
      } catch (error) {
        console.error("Error deleting intern:", error);
      }
    }
  };

  const handleUpdateIntern = (intern) => {
    setFormData({
      name: intern.name,
      email: intern.email,
      phone: intern.phone,
      college: intern.college,
      domain: intern.domain,
      year: intern.year,
      status: intern.status,
    });
    setIsEditing(true);
    setEditingId(intern.id);
    setIsModalOpen(true);
  };

  const handleAddIntern = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      domain: "",
      year: "",
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
      email: "",
      phone: "",
      college: "",
      domain: "",
      year: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="intern-management-layout">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Intern Management</h1>
          <button className="add-btn" onClick={handleAddIntern}>
            Add Intern
          </button>
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by Intern Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>SI No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>Domain</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map((intern, index) => (
              <tr key={intern.id}>
                <td>{index + 1}</td>
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.phone}</td>
                <td>{intern.college}</td>
                <td>{intern.domain}</td>
                <td>{intern.year}</td>
                <td>{intern.status}</td>
                <td>
                  <button
                    className="action-btn update-btn"
                    onClick={() => handleUpdateIntern(intern)}
                  >
                    Update
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteIntern(intern.id)}
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
                <h2>{isEditing ? "Update Intern" : "Add New Intern"}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                {["name", "email", "phone", "college", "domain", "year"].map(
                  (field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )
                )}
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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

export default InternManagement;
