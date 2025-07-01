/*import "./CreateProjectModal.css";
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < today) {
      alert("🚫 Start date cannot be in the past!");
      return;
    }

    if (end <= start) {
      alert("🚫 End date must be after the start date!");
      return;
    }

    if (parseInt(formData.teamMembers) <= 0 || isNaN(formData.teamMembers)) {
      alert("🚫 The number of team members must be greater than 0!");
      return;
    }

    console.log("✅ Project data:", formData);
    onClose(); // ✅ Only close if everything is valid
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
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Project Description</label>
          <textarea
            name="description"
            placeholder="Provide a detailed overview of the project goals, scope..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div className="form-col">
              <label>Start Date</label>
              <input
                name="startDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                min={formData.startDate}
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Team Lead</label>
          <input
            type="text"
            name="teamLead"
            placeholder="e.g., John Smith"
            value={formData.teamLead}
            onChange={handleChange}
            required
          />

          <label>Team Members</label>
          <input
            type="number"
            name="teamMembers"
            placeholder="Number of members"
            value={formData.teamMembers}
            onChange={handleChange}
            required
          />

          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

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

export default CreateProjectModal;*/
import "./CreateProjectModal.css";
import { useState } from "react";
import axios from "axios";

function CreateProjectModal({ onClose, onProjectCreated }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < today) {
      alert("🚫 Start date cannot be in the past!");
      return;
    }

    if (end <= start) {
      alert("🚫 End date must be after the start date!");
      return;
    }

    if (parseInt(formData.teamMembers) <= 0 || isNaN(formData.teamMembers)) {
      alert("🚫 The number of team members must be greater than 0!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/projects", {
        ...formData,
        progress: 0,
        deadline: formData.endDate,
      });

      alert("✅ Projet créé avec succès !");
      onProjectCreated(res.data);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du projet.");
    }
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
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Project Description</label>
          <textarea
            name="description"
            placeholder="Provide a detailed overview of the project goals, scope..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div className="form-col">
              <label>Start Date</label>
              <input
                name="startDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                min={formData.startDate}
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Team Lead</label>
          <input
            type="text"
            name="teamLead"
            placeholder="e.g., John Smith"
            value={formData.teamLead}
            onChange={handleChange}
            required
          />

          <label>Team Members</label>
          <input
            type="number"
            name="teamMembers"
            placeholder="Number of members"
            value={formData.teamMembers}
            onChange={handleChange}
            required
          />

          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

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

