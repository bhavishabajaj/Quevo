import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, keepLoggedIn });
    // Add your login logic here
    // navigate('/'); // Navigate to home after login
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google OAuth logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2>Quevo</h2>
          </Link>
        </div>
        <h1>Welcome Back</h1>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="/login2.png" alt="Google" />
          Log in with Google
        </button>

        <div className="divider">or login with email</div>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              Keep me logged in
            </label>
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="branding">
          <h2>Flip Hiring. Find Faster.</h2>
          <p className="tagline">
            Applicants showcase skills, recruiters discover talent instantly.
            No noise. No endless applying. Just smarter connections.
            <b> Quevo makes hiring bold, fast, and effortless.</b>
          </p>
        </div>
        <img src="/login.png" alt="Work illustration" />
      </div>
    </div>
    </div>
  );
};

export default Login;