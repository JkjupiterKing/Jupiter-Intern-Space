import React, { useState } from "react";
import "./college-management.css";
import Navbar from "../navbar/navbar";

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([
    {
      id: 1,
      code: "AITS001",
      name: "Amal Institute of Technology",
      address: "123 College Ave, Techville, TX 75001",
      status: "Active",
    },
    {
      id: 2,
      code: "BSCT002",
      name: "Best Science & Technology",
      address: "456 University Blvd, Academytown, CA 90210",
      status: "Active",
    },
    {
      id: 3,
      code: "CECT003",
      name: "Central Engineering College",
      address: "789 Education St, Learningville, NY 10001",
      status: "Inactive",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setColleges(
        colleges.map((college) =>
          college.id === editingId ? { ...college, ...formData } : college
        )
      );
    } else {
      const newCollege = {
        id: Date.now(),
        ...formData,
      };
      setColleges([...colleges, newCollege]);
    }
    handleCloseModal();
  };

  const handleDeleteCollege = (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      setColleges(colleges.filter((college) => college.id !== id));
    }
  };

  const handleUpdateCollege = (college) => {
    setFormData({
      code: college.code,
      name: college.name,
      address: college.address,
      status: college.status,
    });
    setIsEditing(true);
    setEditingId(college.id);
    setIsModalOpen(true);
  };

  const handleAddCollege = () => {
    setFormData({
      code: "",
      name: "",
      address: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      code: "",
      name: "",
      address: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="college-management-layout">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="main-content">
        <div className="header">
          <h1>College Management</h1>
          <button className="add-btn" onClick={handleAddCollege}>
            Add College
          </button>
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by College Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>College Code</th>
              <th>College Name</th>
              <th>College Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college) => (
              <tr key={college.id}>
                <td>{college.code}</td>
                <td>{college.name}</td>
                <td>{college.address}</td>
                <td>{college.status}</td>
                <td>
                  <button
                    className="action-btn update-btn"
                    onClick={() => handleUpdateCollege(college)}
                  >
                    Update
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteCollege(college.id)}
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
                <h2>{isEditing ? "Update College" : "Add New College"}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <form id="collegeForm" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="code">College Code</label>
                  <input
                    type="text"
                    id="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">College Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">College Address</label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseModal}
                  >
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

export default CollegeManagement;
