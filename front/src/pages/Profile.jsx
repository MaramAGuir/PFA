import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")); // infos utilisateur connecté

  // Données simulées (à remplacer par un fetch plus tard)
  const createdProjects = [
    { name: "Plateforme RH", deadline: "2025-07-01" },
    { name: "Suivi Formation", deadline: "2025-08-15" },
  ];

  const assignedProjects = [
    { name: "Refonte site web", deadline: "2025-06-28" },
    { name: "Intranet Reporting", deadline: "2025-09-01" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="/default-avatar.png"
          alt="Profil"
          className="profile-avatar"
        />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="user-role">
            {user.role === "chef" ? "Chef de projet" : "Collaborateur"}
          </p>
          <button className="btn upload-btn">Changer la photo</button>
        </div>
      </div>

      <div className="profile-section">
        <button type="submit" className="btn confirm">
          Changer le mot de passe
        </button>
      </div>

      <div className="profile-section">
        <h3>
          {user.role === "chef" ? "Projets créés" : "Projets assignés"} 📁
        </h3>
        <ul className="project-list">
          {(user.role === "chef" ? createdProjects : assignedProjects).map(
            (proj, index) => (
              <li key={index}>
                <strong>{proj.name}</strong> — échéance :{" "}
                <span>{proj.deadline}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
