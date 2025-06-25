import './Layout.css';

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>🚪 Confirmer la déconnexion</h3>
        <p>Êtes-vous sûr(e) de vouloir vous déconnecter ?</p>
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onCancel}>Annuler</button>
          <button className="btn confirm" onClick={onConfirm}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
