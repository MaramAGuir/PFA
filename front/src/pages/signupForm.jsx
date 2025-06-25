import './loginForm.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ton logo Proxym

function SignupForm() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Ici tu peux ajouter une vérification ou un appel API
    navigate('/loginForm'); //  Redirection corrigée
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Proxym Logo" className="proxym-logo" />
      </div>

      <div className="login-box">
        <h2>Create Account</h2>
        <p>Enter your credentials to access your Project Hub.</p>

        <form onSubmit={handleSignup}>
            <label>Full Name</label>
          <input type="text" placeholder="Full name" required />
          <label>User Name</label>
          <input type="text" placeholder="user name" required />
          <label>Your Email</label>
          <input type="email" placeholder="your.email@example.com" required />
          <label> Your password</label>
          <input type="password" placeholder="Password" required />
          <button type="submit">Create</button>
        </form>

        
      </div>
    </div>
  );
}

export default SignupForm;
