/*import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const projectForm = (e) => {
    e.preventDefault();
    navigate('/CreateProjectModal');
  };

  const projects = [
    {
      id: 1,
      name: "Plateforme RH",
      description: "Application de gestion des employés",
      progress: 70,
      deadline: "2025-08-01",
    },
    {
      id: 2,
      name: "Refonte site web",
      description: "Refonte complète du site public",
      progress: 45,
      deadline: "2025-06-28",
    },
  ];

  const isChefProjet = true;

  return (
    <div className="dashboard">

      {/* Statistiques *//*}
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

      {/* Ajouter un projet *//*}
      {isChefProjet && (
        <div className="add-project-section">
          <button className="btn-add-project" onClick={projectForm}>
            + Ajouter un projet
          </button>
        </div>
      )}

      {/* Liste des projets *//*}
      {/*<div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
              <div
                className="project-info"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="deadline">📅 Échéance : {project.deadline}</p>
              </div>

              {/* ➤ Carrot vers les tâches *//*}{/*
              <div
                className="project-arrow"
                onClick={() => navigate(`/project/${project.id}/tasks`)}
                title="Voir les tâches"
              >
                ➤
              </div>
            </div>
          </div>
        ))}
      </div>*//*}
            <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
              <div
                className="project-info"
                onClick={() => navigate(`/tasks`)}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="deadline">📅 Échéance : {project.deadline}</p>
              </div>

              <div
                className="project-arrow"
                onClick={() => navigate(`/tasks`)}
                title="Voir les tâches"
              >
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;*/
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateProjectModal from "./CreateProjectModal"; // importe ton modal

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isChefProjet = true;

  // Charger les projets depuis le backend au chargement
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Erreur chargement projets", err));
  }, []);

  // Ouvre modal pour créer projet
  const openProjectForm = () => {
    setShowModal(true);
  };

  // Ferme modal
  const closeProjectForm = () => {
    setShowModal(false);
  };

  // Ajoute un nouveau projet dans la liste après création réussie
  const handleProjectCreated = (newProject) => {
    setProjects(prev => [...prev, newProject]);
    closeProjectForm();
  };

  return (
    <div className="dashboard">

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>📁 Total Projets</h4>
          <p>{projects.length}</p>
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

      {/* Bouton ajouter projet */}
      {isChefProjet && (
        <div className="add-project-section">
          <button className="btn-add-project" onClick={openProjectForm}>
            + Ajouter un projet
          </button>
        </div>
      )}

      {/* Grille des projets */}
      <div className="project-grid">
        {projects.map(project => (
          <div key={project._id || project.id} className="project-card">
            <div className="project-content">
              <div
                className="project-info"
                onClick={() => navigate(`/tasks`)}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="deadline">📅 Échéance : {project.deadline}</p>
              </div>
              <div
                className="project-arrow"
                onClick={() => navigate(`/tasks`)}
                title="Voir les tâches"
              >
                ➤
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal création projet */}
      {showModal && (
        <CreateProjectModal
          onClose={closeProjectForm}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </div>
  );
}

export default Dashboard;
