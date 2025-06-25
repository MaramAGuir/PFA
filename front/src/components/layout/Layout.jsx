import Sidebar from './Sidebar';
import Header from './Header';
import LogoutModal from './LogoutModal';
import './Layout.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Layout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/"); // ou vers "/login" si tu as une page d’accueil
  };

  return (
    <div className="layout">
      <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />
      <div className="layout-content">
        <Header />
        <main className="layout-main">
          <Outlet />
          {showLogoutModal && (
            <LogoutModal
              onCancel={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Layout;
