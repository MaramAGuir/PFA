import React from 'react'; // ⬅️ Import obligatoire !
import './DetailsTask.css';

const DetailTask = () => {
  return (
    <div className="detail-task">
      <div className="task-header">
        <h2>Task Name</h2>
        <div className="task-info">
          <span>UI/UX Design - Apps Design</span>
          <a href="#">+ Get Mentors</a>
        </div>
        <div className="task-meta">
          <span>👥 nombre de collaborateurs</span>
          <span>📅 deadline</span>
        </div>
      </div>

      <div className="task-body">
        <div className="task-description">
          <h3>Description</h3>
          <p>
            Follow the video tutorial above. Understand how to use each tool in the Figma application...
          </p>
        </div>

        <div className="task-tech">
          <h3>Technologie/highlights</h3>
          <ul>
            <li>...................</li>
            <li>...................</li>
            <li>...................</li>
          </ul>
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

        <div className="task-status">
          <h3>Statut</h3>
          <div className="status-box">None</div>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;
