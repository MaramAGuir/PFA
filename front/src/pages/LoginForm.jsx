import './loginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.jpg';

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      setErrorMsg(error.message || "Erreur de connexion");
      return;
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Redirige TOUJOURS vers dashboard
    navigate("/dashboard");

  } catch (err) {
    setErrorMsg("Erreur de connexion au serveur");
    console.error(err);
  }
};


  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Proxym Logo" className="proxym-logo" />
      </div>

      <div className="login-box">
        <h2>Welcome !</h2>
        <p>Enter your credentials to access your Project Hub.</p>

        {errorMsg && <p style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</p>}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Your Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Your Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
