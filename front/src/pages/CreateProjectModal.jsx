import "./CreateProjectModal.css";
import { useState } from "react";

function CreateProjectModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    teamLead: "",
    teamMembers: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Project data:", formData);
    onClose();
  };
return (
    <div className="modal-overlay">
      <div className="modal-form-advanced">
        <div className="modal-header">
          <h2>Create New Project</h2>
          <p>Fill in the details to start a new collaborative project.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input
            name="name"
            type="text"
            placeholder="e.g., Q3 Marketing Campaign"
            onChange={handleChange}
            required
          />

          <label>Project Description</label>
          <textarea
            name="description"
            placeholder="Provide a detailed overview of the project goals, scope..."
            onChange={handleChange}
            required
          />
           <div className="form-row">
            <div className="form-col">
              <label>Start Date</label>
              <input
                name="startDate"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Team Members</label>
          <input
            type="number"
            name="teamMembers"
            onChange={handleChange}
            required
          ></input>
           <div className="modal-buttons">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn confirm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
