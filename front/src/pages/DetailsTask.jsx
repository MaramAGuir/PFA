/*import React, { useState } from 'react';
import './DetailsTask.css';

const DetailTask = () => {
  const [status, setStatus] = useState('None');
  const [note, setNote] = useState('');

  return (
    <div className="detail-task">
      <div className="task-left">
        <div className="task-header">
          <h2>Task Name</h2>
          <div className="task-info">
            <span>UI/UX Design . Apps Design</span>
            <a href="#" className="get-mentors">+ Get Mentors</a>
          </div>
          <div className="task-meta">
            <span>👥 nombre de collaborateurs</span>
            <span>📅 deadline</span>
          </div>
        </div>

        <div className="task-description">
          <h3>Description</h3>
          <p>
            Follow the video tutorial above. Understand how to use each tool in the Figma application.
            Also learn how to make a good and correct design. Starting from spacing, typography, content,
            and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.
          </p>
        </div>

        <div className="task-tech">
          <h3>Technologie/highlights</h3>
          <ul>
            <li>..................</li>
            <li>..................</li>
            <li>..................</li>
            <li>..................</li>
          </ul>
        </div>
      </div>

      <div className="task-right">
        <div className="task-status">
          <h3>Statut</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="status-select">
            <option value="None">None</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <textarea
            className="note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
          ></textarea>
        </div>

        <div className="task-file-section">
          <h3>File Task</h3>
          <div className="file-meta">
            <span>Last Modified</span>
            <span>Date</span>
          </div>
          <div className="file-upload">
            <div className="upload-box">
              <span role="img" aria-label="folder">📁</span>
              <p>Drag or browse from device</p>
            </div>
          </div>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;*/

/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailsTask.css';

const DetailsTask = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('None');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 taskId depuis URL :", taskId); // ← Ajoute cette ligne

    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement de la tâche');
        const data = await response.json();
        setTask(data);
        setStatus(data.status || 'None');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!task) return <p>Aucune tâche trouvée</p>;

  return (
    <div className="detail-task">
      <div className="task-left">
        <div className="task-header">
          <h2>{task.title}</h2>
          <div className="task-info">
            <span>{task.assignee}</span>
            <a href="#" className="get-mentors">+ Get Mentors</a>
          </div>
          <div className="task-meta">
            <span>👥 {task.teamMembers} collaborateurs</span>
            <span>📅 {new Date(task.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="task-description">
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>

        <div className="task-tech">
          <h3>Technologie / Highlights</h3>
          <ul>
            {task.highlights
              ? task.highlights.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))
              : <li>Aucun</li>}
          </ul>
        </div>
      </div>

      <div className="task-right">
        <div className="task-status">
          <h3>Statut</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <textarea
            className="note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
          />
        </div>

        <div className="task-file-section">
          <h3>File Task</h3>
          <div className="file-meta">
            <span>Last Modified</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="file-upload">
            <div className="upload-box">
              📁 <p>Drag or browse from device</p>
            </div>
          </div>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsTask;*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailsTask.css';

const DetailsTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`);
        if (!res.ok) throw new Error("Erreur lors du chargement de la tâche");
        const data = await res.json();
        setTask(data);
        setStatus(data.status || 'To Do');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSaveStatus = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Échec de la mise à jour du statut");
      alert("✅ Statut mis à jour !");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!task) return <p>Aucune tâche trouvée</p>;

  return (
    <div className="detail-task">
      <div className="task-left">
        <div className="task-header">
          <h2>{task.title}</h2>
          <div className="task-info">
            <span>{task.assignee}</span>
            <a href="#" className="get-mentors">+ Get Mentors</a>
          </div>
          <div className="task-meta">
            <span>👥 {task.teamMembers} collaborateurs</span>
            <span>📅 {new Date(task.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="task-description">
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>

        <div className="task-tech">
          <h3>Technologie / Highlights</h3>
          <ul>
            {task.highlights
              ? task.highlights.split(',').map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                ))
              : <li>Aucun</li>}
          </ul>
        </div>
      </div>

      <div className="task-right">
        <div className="task-status">
          <h3>Statut</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <textarea
            className="note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
          />
          <button className="submit-btn" onClick={handleSaveStatus}>Enregistrer</button>
        </div>

        <div className="task-file-section">
          <h3>File Task</h3>
          <div className="file-meta">
            <span>Last Modified</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="file-upload">
            <div className="upload-box">
              📁 <p>Drag or browse from device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTask;
