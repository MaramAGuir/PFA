import "./Layout.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profile from "./images/user.png";
import notif from "./images/cloche.png";

function Header({ onLogoutClick }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setShowNotifMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <h1 className="header-title">Dashboard</h1>

      {/* 🔔 Notifications */}
      <div className="icon-wrapper" ref={notifRef}>
        <img
          src={notif}
          alt="Notifications"
          className="notif-header"
          onClick={() => {
            setShowNotifMenu(!showNotifMenu);
            setShowProfileMenu(false);
          }}
        />
        {showNotifMenu && (
          <div className="dropdown-menu">
            <p>🔔 3 nouvelles notifications</p>
            <p>📅 Tâche urgente aujourd’hui</p>
            <p>✅ Mission terminée</p>
          </div>
        )}
      </div>

      {/* 👤 Profil */}
      <div className="icon-wrapper" ref={profileRef}>
        <img
          src={profile}
          alt="Profil"
          className="profile-header"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
            setShowNotifMenu(false);
          }}
        />
        {showProfileMenu && (
          <div className="dropdown-menu">
            <button
              className="dropdown-btn"
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/profile");
              }}
            >
              👁️ View Details
            </button>
            <button
              className="dropdown-btn"
              onClick={() => {
                setShowProfileMenu(false);
                onLogoutClick(); // 🔁 appelle la modale logout
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
