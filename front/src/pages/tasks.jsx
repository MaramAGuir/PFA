/*import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./tasks.css";
import CreateTaskModal from "./CreateTask";

function Tasks() {
  const navigate = useNavigate(); // ✅ correct usage

  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([
    {
      collaborator: "John Doe",
      description: "Fix login bug on Safari",
      progress: 90,
      status: "En cours",
      title: "Debug Auth",
      startDate: "2025-07-01",
      endDate: "2025-07-05",
    },
    {
      collaborator: "Sarah Smith",
      description: "Refactor UI components",
      progress: 85,
      status: "En révision",
      title: "UI Refactor",
      startDate: "2025-07-03",
      endDate: "2025-07-08",
    },
  ]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>Nom du Projet</h2>
        <button className="btn-add-task" onClick={() => setShowModal(true)}>
          + Ajouter une tâche
        </button>
      </div>

      <div className="task-grid">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task-card"
            onClick={() => navigate(`/DetailsTask/${index}`)} // Redirection
          >
            <div className="task-header">
              <div>
                <h4>{task.title}</h4>
                <p className="collaborator">{task.collaborator}</p>
              </div>
              <span className="status">{task.status}</span>
            </div>
            <p className="description">{task.description}</p>

            <div className="progress-section">
              <label>Progress</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <span className="percent">{task.progress}%</span>
            </div>

            <div className="footer">
              <p className="deadline">🕒 {task.endDate}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={addTask}
        />
      )}
    </div>
  );
}

export default Tasks;*/

// src/pages/Tasks.jsx


/*import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateTaskModal from "./CreateTask";
import "./tasks.css";

function Tasks() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        console.error("❌ Erreur chargement projet :", error);
      } finally {
        setLoadingProject(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) {
      setError("Erreur : projectId manquant dans l'URL.");
      setLoadingTasks(false);
      return;
    }

    setLoadingTasks(true);
    setError(null);

    fetch(`http://localhost:5000/api/projects/${projectId}/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erreur réseau ou serveur");
        setTasks([]);
      })
      .finally(() => setLoadingTasks(false));
  }, [projectId]);

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return <span className="status-icon todo">📝 To Do</span>;
      case "In Progress":
        return <span className="status-icon progress">🔄 In Progress</span>;
      case "Done":
        return <span className="status-icon done">✅ Done</span>;
      default:
        return <span className="status-icon">❓</span>;
    }
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>
          Projet :{" "}
          {loadingProject
            ? "Chargement..."
            : project
            ? project.name
            : "Projet introuvable"}
        </h2>
        <button className="btn-add-task" onClick={() => setShowModal(true)}>
          + Ajouter une tâche
        </button>
      </div>

      {loadingTasks && <p>Chargement des tâches...</p>}
      {error && <p className="error">❌ {error}</p>}

      {!loadingTasks && tasks.length === 0 && !error && (
        <p>Aucune tâche n’est encore créée pour ce projet.</p>
      )}

      <div className="task-grid">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="task-card"
            onClick={() => navigate(`/DetailsTask/${task._id}`)}
          >
            {getStatusIcon(task.status)}
            <h4>{task.title}</h4>
            <p>{task.assignee}</p>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={addTask}
          projectId={projectId}
        />
      )}
    </div>
  );
}

export default Tasks;*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateTaskModal from "./CreateTask";
import "./tasks.css";

function Tasks() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        console.error("❌ Erreur chargement projet :", error);
      } finally {
        setLoadingProject(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) {
      setError("Erreur : projectId manquant dans l'URL.");
      setLoadingTasks(false);
      return;
    }

    setLoadingTasks(true);
    setError(null);

    fetch(`http://localhost:5000/api/projects/${projectId}/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erreur réseau ou serveur");
        setTasks([]);
      })
      .finally(() => setLoadingTasks(false));
  }, [projectId]);

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return <span className="status-icon todo">📝 To Do</span>;
      case "In Progress":
        return <span className="status-icon progress">🔄 In Progress</span>;
      case "Done":
        return <span className="status-icon done">✅ Done</span>;
      default:
        return <span className="status-icon">❓</span>;
    }
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>
          Projet :{" "}
          {loadingProject ? "Chargement..." : project ? project.name : "Projet introuvable"}
        </h2>
        <button className="btn-add-task" onClick={() => setShowModal(true)}>
          + Ajouter une tâche
        </button>
      </div>

      {loadingTasks && <p>Chargement des tâches...</p>}
      {error && <p className="error">❌ {error}</p>}

      {!loadingTasks && tasks.length === 0 && !error && (
        <p>Aucune tâche n’est encore créée pour ce projet.</p>
      )}

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card" onClick={() => navigate(`/DetailsTask/${task._id}`)}>
            <div className="task-card-header">
              <h4>{task.title}</h4>
              {getStatusIcon(task.status)}
            </div>
            <div className="task-dates">
              📅 {new Date(task.startDate).toLocaleDateString()} → {new Date(task.endDate).toLocaleDateString()}
            </div>
            <div className="task-description-box">
              <p><strong>👤 {task.assignee}</strong></p>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={addTask}
          projectId={projectId}
        />
      )}
    </div>
  );
}

export default Tasks;
