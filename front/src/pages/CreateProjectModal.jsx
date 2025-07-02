import "./CreateProjectModal.css";
import { useState } from "react";



function CreateProjectModal({ onClose, onProjectAdded }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    teamLead: "",
    teamMembers: "",
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
    alert("🚫 La date de début ne peut pas être dans le passé !");
    return;
  }

  if (end <= start) {
    alert("🚫 La date de fin doit être postérieure à la date de début !");
    return;
  }

  if (parseInt(formData.teamMembers) <= 0) {
    alert("🚫 Le nombre de membres doit être supérieur à 0 !");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
    const data = await res.json();
    console.log("✅ Projet enregistré :", data);
    onProjectAdded(); // recharge la liste
    onClose();         // ferme la modale
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Erreur de connexion au serveur.");
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
                min={new Date().toISOString().split("T")[0]} // date d’aujourd’hui
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                min={formData.startDate} // empêche de choisir une fin avant le début
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
