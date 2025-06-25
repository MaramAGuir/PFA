
import './loginForm.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ton logo Proxym

function LoginForm() {
    const navigate = useNavigate(); // initialiser le hook
    const handleLogin = (e) => {
        e.preventDefault();

    // Ici tu peux vérifier les identifiants, etc.
        navigate('/Dashboard'); // rediriger vers la page Dashboard
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
            <label>Your Email</label>
          <input type="email" placeholder="your.email@example.com" required />
          <label> Your password</label>
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <a href="/Dashboard">Forgot Password?</a>
          <a href="/signupForm">Create Account?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
