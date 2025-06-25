import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();

  const projectForm = (e) => {
    e.preventDefault();
    navigate('/CreateProjectModal'); // Redirection
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

      {/* Bouton ajouter projet */}
      {isChefProjet && (
        <div className="add-project-section">
          <button className="btn-add-project" onClick={projectForm}>
            + Ajouter un projet
          </button>
        </div>
      )}

      {/* Liste de projets */}
      <div className="project-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
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
        ))}
      </div>
    </div>
  );
}

export default Tasks;
