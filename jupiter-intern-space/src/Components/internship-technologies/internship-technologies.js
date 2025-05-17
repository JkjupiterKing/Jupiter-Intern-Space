import React, { useState, useEffect } from "react";
import "./internship-technologies.css";
import Navbar from "../navbar/navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/internship-technologies";

const InternshipTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    Technologyname: "",
    Description: "",
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
        await axios.post(`${API_BASE_URL}/add`, formData);
      }
      await fetchTechnologies();
      const modalEl = document.getElementById("techModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
      resetForm();
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
      Technologyname: tech.Technologyname,
      Description: tech.Description,
    });
    setIsEditing(true);
    setEditingId(tech.id);
    new window.bootstrap.Modal(document.getElementById("techModal")).show();
  };

  const handleAddTechnology = () => {
    resetForm();
    new window.bootstrap.Modal(document.getElementById("techModal")).show();
  };

  const resetForm = () => {
    setFormData({
      Technologyname: "",
      Description: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredTechnologies = technologies.filter((tech) =>
    tech.Technologyname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="internship-technologies-layout">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="main-content p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Internship Technologies</h1>
          <button
            className="btn btn-primary"
            onClick={handleAddTechnology}
            id="add-btn"
          >
            Add Technology
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Technology Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnologies.map((tech) => (
              <tr key={tech.id}>
                <td>{tech.Technologyname}</td>
                <td>{tech.Description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleUpdateTechnology(tech)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTechnology(tech.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="techModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Update Technology" : "Add New Technology"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="Technologyname" className="form-label">
                      Technology Name
                    </label>
                    <input
                      type="text"
                      id="Technologyname"
                      className="form-control"
                      value={formData.Technologyname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="Description"
                      className="form-control"
                      value={formData.Description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Technology
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Bootstrap Modal */}
      </div>
    </div>
  );
};

export default InternshipTechnologies;
