import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "./CreateProjectModal"; // à créer

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isChefProjet = user?.role === "chef";


  // const projects = [
  //   {
  //     id: 1,
  //     name: "Plateforme RH",
  //     description: "Application de gestion des employés",
  //     progress: 70,
  //     deadline: "2025-07-01"
  //   },
  //   {
  //     id: 2,
  //     name: "Refonte site web",
  //     description: "Refonte complète du site public",
  //     progress: 45,
  //     deadline: "2025-06-28"
  //   },
  // ];
  const fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Erreur API :", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

 
  return (
    <div className="dashboard">
      {/* Statistiques */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>📁 Total Projets</h4>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h4>⏰ Tâches en retard</h4>
          <p>3</p>
        </div>
        <div className="stat-card">
          <h4>👥 Collaborateurs</h4>
          <p>8</p>
        </div>
      </div>

      {/* Bouton ajout */}
      {isChefProjet && (
        <div className="add-project-section">
          <button className="btn-add-project" onClick={() => setShowModal(true)}>
            + Ajouter un projet
          </button>
        </div>
      )}


      {/* Grille projets */}
      <div className="project-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <p className="deadline">
              📅 Échéance : {new Date(project.endDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>

            </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectAdded={fetchProjects}
        />
      )}
    </div>
  );
}

export default Dashboard;
