import React, { useState, useEffect, useRef } from "react";
import "./college-management.css";
import Navbar from "../navbar/navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/colleges";

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    collegeCode: "",
    collegeName: "",
    collegeAddress: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const modalRef = useRef();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setColleges(response.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    }
  };

  // Reset form data after modal closes
  useEffect(() => {
    const modalEl = modalRef.current;

    const handleModalHidden = () => {
      setFormData({
        collegeCode: "",
        collegeName: "",
        collegeAddress: "",
        status: "Active",
      });
      setIsEditing(false);
      setEditingId(null);
    };

    if (modalEl) {
      modalEl.addEventListener("hidden.bs.modal", handleModalHidden);
    }

    return () => {
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", handleModalHidden);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      await fetchColleges();
      document.getElementById("closeModalBtn").click();
    } catch (error) {
      console.error("Error saving college:", error);
    }
  };

  const handleDeleteCollege = async (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        await fetchColleges();
      } catch (error) {
        console.error("Error deleting college:", error);
      }
    }
  };

  const handleUpdateCollege = (college) => {
    setFormData({
      collegeCode: college.collegeCode || "",
      collegeName: college.collegeName || "",
      collegeAddress: college.collegeAddress || "",
      status: college.status || "Active",
    });
    setIsEditing(true);
    setEditingId(college.id);
    new window.bootstrap.Modal(modalRef.current).show();
  };

  const handleAddCollege = () => {
    setFormData({
      collegeCode: "",
      collegeName: "",
      collegeAddress: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
    new window.bootstrap.Modal(modalRef.current).show();
  };

  const filteredColleges = colleges.filter((college) =>
    (college.collegeName || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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

        <table className="table table-bordered table-striped">
          <thead className="table-primary">
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
                <td>{college.collegeCode}</td>
                <td>{college.collegeName}</td>
                <td>{college.collegeAddress}</td>
                <td>{college.status || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleUpdateCollege(college)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteCollege(college.id)}
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
          id="collegeModal"
          ref={modalRef}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Update College" : "Add New College"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="closeModalBtn"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="collegeCode"
                      placeholder="Enter College Code"
                      value={formData.collegeCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="collegeName"
                      placeholder="Enter College Name"
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="collegeAddress"
                      value={formData.collegeAddress}
                      onChange={handleInputChange}
                      placeholder="Enter College Address"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
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
                    Save College
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End of Modal */}
      </div>
    </div>
  );
};

export default CollegeManagement;
