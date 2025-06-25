import React, { useState } from 'react';
import './ProjectForm.css';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teamSize: '',
    duration: '',
    priority: 'medium',
    startDate: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simuler envoi à l'API
    setTimeout(() => {
      console.log('Projet créé:', formData);
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2>Créer un Nouveau Projet</h2>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group full-width">
            <label>Nom du projet</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Refonte du site web"
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez les objectifs du projet..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Nombre de membres</label>
            <input
              type="number"
              name="teamSize"
              className="form-control"
              value={formData.teamSize}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Durée (jours)</label>
            <input
              type="number"
              name="duration"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date de début</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Priorité</label>
            <select 
              name="priority" 
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
          
          <button type="submit" className="btn-submit">
            Créer le projet
          </button>
        </form>
      ) : (
        <div className="result">
          <h3>
            <span role="img" aria-label="succès">✅</span> 
            Projet créé avec succès !
          </h3>
          <p><strong>Nom :</strong> {formData.name}</p>
          <p><strong>Description :</strong> {formData.description}</p>
          <p><strong>Équipe :</strong> {formData.teamSize} personnes</p>
          <p><strong>Durée :</strong> {formData.duration} jours</p>
          <p><strong>Priorité :</strong> 
            {formData.priority === 'high' ? ' Haute' : 
             formData.priority === 'medium' ? ' Moyenne' : ' Basse'}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectForm;