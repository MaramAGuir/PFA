/*import "./CreateTask.css";
import { useState } from "react";

function CreateTaskModal({ onClose }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    assignee: "",
    teamMembers: 1,
    status: "To Do", // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(taskData.startDate);
    const end = new Date(taskData.endDate);

    if (start < today) {
      alert("🚫 The start date cannot be in the past!");
      return;
    }

    if (end <= start) {
      alert("🚫 The end date must be after the start date!");
      return;
    }

    if (parseInt(taskData.teamMembers) <= 0) {
      alert("🚫 The number of team members must be greater than 0!");
      return;
    }

    console.log("✅ New task created:", taskData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form-advanced">
        <div className="modal-header">
          <h2>Create New Task</h2>
          <p>Fill in the fields to create a new task for the project.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter task title"
            value={taskData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe the task..."
            value={taskData.description}
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
                value={taskData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                min={taskData.startDate}
                value={taskData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Assignee</label>
          <input
            type="text"
            name="assignee"
            placeholder="Responsible person"
            value={taskData.assignee}
            onChange={handleChange}
            required
          />

          <label>Team Members</label>
          <input
            type="number"
            name="teamMembers"
            min="1"
            value={taskData.teamMembers}
            onChange={handleChange}
            required
          />

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

export default CreateTaskModal;*/

// src/pages/CreateTask.jsx

/*import { useState } from "react";
import "./CreateTask.css";

function CreateTaskModal({ onClose, onAddTask, projectId }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    assignee: "",
    teamMembers: 1,
    status: "To Do",
    highlights: "",
    progress: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectId) {
      setError("Erreur : projectId manquant.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskData, projectId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'ajout de la tâche");
      }

      const newTask = await response.json();
      onAddTask(newTask);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form-advanced">
        <div className="modal-header">
          <h2>Créer une tâche</h2>
          <p>Remplis les champs ci-dessous.</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Titre</label>
          <input
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />

          <label>Date de début</label>
          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            required
          />

          <label>Date de fin</label>
          <input
            type="date"
            name="endDate"
            value={taskData.endDate}
            onChange={handleChange}
            required
          />

          <label>Responsable</label>
          <input
            name="assignee"
            value={taskData.assignee}
            onChange={handleChange}
            required
          />

          <label>Nombre de membres</label>
          <input
            type="number"
            name="teamMembers"
            min="1"
            value={taskData.teamMembers}
            onChange={handleChange}
            required
          />

          <label>Points forts</label>
          <input
            name="highlights"
            value={taskData.highlights}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn cancel">
              Annuler
            </button>
            <button type="submit" className="btn confirm">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;*/

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔁 Import pour redirection
import "./CreateTask.css";

function CreateTaskModal({ onClose, onAddTask, projectId }) {
  const navigate = useNavigate(); // 🔁 Hook pour redirection

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    assignee: "",
    teamMembers: 1,
    status: "To Do",
    highlights: "",
    progress: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectId) {
      setError("Erreur : projectId manquant.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskData, projectId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'ajout de la tâche");
      }

      const newTask = await response.json();
      onAddTask(newTask);    // facultatif : pour mettre à jour la liste des tâches dans la page parente
      onClose();             // ferme le modal

      navigate(`/DetailsTask/${newTask._id}`); // 🔁 Redirection vers page détails
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form-advanced">
        <div className="modal-header">
          <h2>Créer une tâche</h2>
          <p>Remplis les champs ci-dessous.</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Titre</label>
          <input
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />

          <label>Date de début</label>
          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            required
          />

          <label>Date de fin</label>
          <input
            type="date"
            name="endDate"
            value={taskData.endDate}
            onChange={handleChange}
            required
          />

          <label>Responsable</label>
          <input
            name="assignee"
            value={taskData.assignee}
            onChange={handleChange}
            required
          />

          <label>Nombre de membres</label>
          <input
            type="number"
            name="teamMembers"
            min="1"
            value={taskData.teamMembers}
            onChange={handleChange}
            required
          />

          <label>Points forts</label>
          <input
            name="highlights"
            value={taskData.highlights}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn cancel">
              Annuler
            </button>
            <button type="submit" className="btn confirm">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;


