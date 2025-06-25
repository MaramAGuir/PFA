import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetail";
import LoginForm from "./pages/LoginForm";

import { Navigate } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={<Navigate to="/login" />} /> // par défaut redirige vers la page de connexion

    <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Route>
</Routes>

      
    </BrowserRouter>
  );
}

export default App;
