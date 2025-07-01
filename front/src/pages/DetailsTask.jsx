import React, { useState } from 'react';
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

export default DetailTask;
