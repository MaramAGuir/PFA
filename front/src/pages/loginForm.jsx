import './loginForm.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';



function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Authentification à ajouter ici (backend)
   navigate("/dashboard"); 
  };

  return (
    
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Proxym Logo" className="proxym-logo" />
      </div>

      <div className="login-box">
        <h2>Welcome !</h2>
        <p>Enter your credentials to access your Project Hub.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Your Email</label>
          <input id="email" name="email" type="email" placeholder="your.email@example.com" required />

          <label htmlFor="password">Your Password</label>
          <input id="password" name="password" type="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    </div>
    
  );
}

export default LoginForm;
