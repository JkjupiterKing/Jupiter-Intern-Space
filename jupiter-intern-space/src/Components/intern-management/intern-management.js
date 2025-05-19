import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import "./intern-management.css";

const API_BASE_URL = "http://localhost:8080/users";

const InternManagement = () => {
  const [interns, setInterns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    collegeName: "",
    degree: "",
    department: "",
    yearOfStudy: "",
    internshipDomain: "",
    preferredMode: "",
    documents: "",
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
        await axios.post(`${API_BASE_URL}/addUser`, formData);
      }
      await fetchInterns();
      const modalEl = document.getElementById("internModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
      resetForm();
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
    setFormData({ ...intern, password: "" });
    setIsEditing(true);
    setEditingId(intern.id);
    new window.bootstrap.Modal(document.getElementById("internModal")).show();
  };

  const handleAddIntern = () => {
    resetForm();
    new window.bootstrap.Modal(document.getElementById("internModal")).show();
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      collegeName: "",
      degree: "",
      department: "",
      yearOfStudy: "",
      internshipDomain: "",
      preferredMode: "",
      documents: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredInterns = interns.filter((intern) =>
    intern.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="intern-management-layout">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="main-content p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Intern Management</h1>
          <button
            className="btn btn-primary"
            onClick={handleAddIntern}
            id="add-btn"
          >
            Add Intern
          </button>
        </div>

        <input
          type="text"
          id="Search-bar"
          className="form-control mb-3"
          placeholder="Search by Intern Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>SI No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>Domain</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map((intern, index) => (
              <tr key={intern.id}>
                <td>{index + 1}</td>
                <td>{intern.fullName}</td>
                <td>{intern.email}</td>
                <td>{intern.phoneNumber}</td>
                <td>{intern.collegeName}</td>
                <td>{intern.internshipDomain}</td>
                <td>{intern.yearOfStudy}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    id="btn-update"
                    onClick={() => handleUpdateIntern(intern)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    id="btn-delete"
                    onClick={() => handleDeleteIntern(intern.id)}
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
          id="internModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Update Intern" : "Add New Intern"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {[
                    { id: "fullName", type: "text", placeholder: "Full Name" },
                    { id: "email", type: "email", placeholder: "Email" },
                    {
                      id: "phoneNumber",
                      type: "text",
                      placeholder: "Phone Number",
                    },
                    {
                      id: "password",
                      type: "password",
                      placeholder: "Password",
                      required: !isEditing,
                    },
                    {
                      id: "collegeName",
                      type: "text",
                      placeholder: "College Name",
                    },
                    { id: "degree", type: "text", placeholder: "Degree" },
                    {
                      id: "department",
                      type: "text",
                      placeholder: "Department",
                    },
                    {
                      id: "yearOfStudy",
                      type: "text",
                      placeholder: "Year of Study",
                    },
                    {
                      id: "internshipDomain",
                      type: "text",
                      placeholder: "Internship Domain",
                    },
                  ].map(({ id, type, placeholder, required = true }) => (
                    <div className="mb-3" key={id}>
                      <input
                        type={type}
                        className="form-control"
                        id={id}
                        placeholder={placeholder}
                        value={formData[id]}
                        onChange={handleInputChange}
                        required={required}
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <select
                      className="form-select"
                      id="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Preferred Mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="documents"
                      onChange={handleInputChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
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
                    Save Intern
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Modal */}
      </div>
    </div>
  );
};

export default InternManagement;
