import './Layout.css';
import { NavLink } from 'react-router-dom';
import logo from './images/logo.png';
import dashboard from './images/dashboards.png';
import profile from './images/user.png';
import notif from './images/cloche.png';
import setting from './images/setting.png';
import logout from './images/logout.png';

function Sidebar({ onLogoutClick }) {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">
          <img src={logo} alt="Logo" className="logo-icon" />
          Proxym IT
        </h2>
        <nav>
          <NavLink to="/" className="sidebar-item" end>
            <img src={dashboard} alt="dashboard" className="icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/profile" className="sidebar-item">
            <img src={profile} alt="profile" className="icon" />
            <span>Profile</span>
          </NavLink>
          <NavLink to="/inbox" className="sidebar-item">
            <img src={notif} alt="notif" className="icon" />
            <span>Inbox</span>
          </NavLink>
          <NavLink to="/settings" className="sidebar-item">
            <img src={setting} alt="settings" className="icon" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-logout">
        <p className="sidebar-item" onClick={onLogoutClick}>
          <img src={logout} alt="logout" className="icon" />
          <span>Logout</span>
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;