import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login with API
      const data = await authAPI.login({ email, password });

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'applicant') {
        navigate('/applicant-dashboard');
      } else if (data.user.role === 'recruiter') {
        navigate('/recruiter-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError('');
    
    // Simulate Google user data (In production, this comes from Google OAuth)
    const mockGoogleUser = {
      name: 'Google User ' + Math.floor(Math.random() * 1000),
      email: 'user' + Math.floor(Math.random() * 10000) + '@gmail.com',
      googleId: 'google_' + Date.now()
    };
    
    setGoogleUserData(mockGoogleUser);
    setShowRoleModal(true);
  };

  const handleRoleSelection = async (role) => {
    setLoading(true);
    setShowRoleModal(false);
    
    try {
      const userData = {
        ...googleUserData,
        password: googleUserData.googleId, // Use Google ID as password
        role: role
      };

      // Try to register (or login if already exists)
      try {
        const registerData = await authAPI.register(userData);
        
        localStorage.setItem('token', registerData.token);
        localStorage.setItem('user', JSON.stringify(registerData.user));
        
        if (role === 'applicant') {
          navigate('/applicant-dashboard');
        } else {
          navigate('/recruiter-dashboard');
        }
      } catch (regErr) {
        // If registration fails (user exists), try login
        const loginData = await authAPI.login({ 
          email: userData.email, 
          password: userData.password 
        });
        
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        
        if (loginData.user.role === 'applicant') {
          navigate('/applicant-dashboard');
        } else {
          navigate('/recruiter-dashboard');
        }
      }
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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

        {error && <div className="error-message">{error}</div>}

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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
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

    {/* Role Selection Modal */}
    {showRoleModal && (
      <div className="role-modal-overlay" onClick={() => setShowRoleModal(false)}>
        <div className="role-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Choose Your Account Type</h2>
          <p>How would you like to use Quevo?</p>
          
          <div className="role-options">
            <button 
              className="role-option applicant" 
              onClick={() => handleRoleSelection('applicant')}
              disabled={loading}
            >
              <div className="role-icon">👤</div>
              <h3>I'm an Applicant</h3>
              <p>Looking for jobs and showcasing my skills</p>
            </button>

            <button 
              className="role-option recruiter" 
              onClick={() => handleRoleSelection('recruiter')}
              disabled={loading}
            >
              <div className="role-icon">💼</div>
              <h3>I'm a Recruiter</h3>
              <p>Looking to hire talent for my company</p>
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Login;