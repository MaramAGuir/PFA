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

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./tasks.css";
import CreateTaskModal from "./CreateTask";

function Tasks() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erreur de chargement:", err));
  }, []);

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
            onClick={() => navigate(`/DetailsTask/${index}`)}
          >
            <div className="task-header">
              <div>
                <h4>{task.title}</h4>
                <p className="collaborator">{task.assignee}</p>
              </div>
              <span className="status">{task.status}</span>
            </div>
            <p className="description">{task.description}</p>

            {task.highlights && <p className="highlights">🔍 {task.highlights}</p>}

            <div className="progress-section">
              <label>Progress</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${task.progress || 0}%` }}
                ></div>
              </div>
              <span className="percent">{task.progress || 0}%</span>
            </div>

            <div className="footer">
              <p className="deadline">🕒 {task.endDate}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateTaskModal onClose={() => setShowModal(false)} onAddTask={addTask} />
      )}
    </div>
  );
}

export default Tasks;
