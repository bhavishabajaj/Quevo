import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Signup.css';

const Signup = () => {
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'applicant', 'recruiter'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showForm = (type) => {
    setScreen(type);
  };

  const goBack = () => {
    setScreen('welcome');
    setFormData({ name: '', email: '', password: '' });
  };

  const switchToRecruiter = () => {
    setScreen('recruiter');
    setFormData({ name: '', email: '', password: '' });
  };

  const switchToApplicant = () => {
    setScreen('applicant');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Register user with API
      const data = await authAPI.register({
        ...formData,
        role: screen // 'applicant' or 'recruiter'
      });

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (screen === 'applicant') {
        navigate('/applicant-dashboard');
      } else if (screen === 'recruiter') {
        navigate('/recruiter-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="auth-container">
      {/* Welcome Screen */}
      {screen === 'welcome' && (
        <div className="welcome-screen">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="brand-logo">Quevo</div>
          </Link>
          <div className="brand-subtitle">Professional Platform</div>
          <div className="auth-options">
            <button className="auth-btn" onClick={() => showForm('applicant')}>
              Applicant
            </button>
            <button className="auth-btn" onClick={() => showForm('recruiter')}>
              Recruiter
            </button>
          </div>
        </div>
      )}

      {/* Applicant Form */}
      {screen === 'applicant' && (
        <div className="auth-form applicant-form active">
          <button className="back-btn-top" onClick={goBack}>
            ←
          </button>
          <div className="left-panel">
            <h2 className="panel-title">WELCOME APPLICANT</h2>
            <p className="panel-description">
              Explore opportunities and showcase your talents. Your journey to the perfect role starts here.
            </p>
            <img src="/login.png" alt="Illustration" className="panel-image" />
          </div>
          <div className="right-panel">
            <h2 className="form-title">Applicant Signup</h2>
            <p className="form-subtitle">Create your account</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <p className="alt-link">
              Want to hire?{' '}
              <a href="#" onClick={switchToRecruiter}>
                Sign up as Recruiter
              </a>
            </p>
            <p className="alt-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      )}

      {/* Recruiter Form */}
      {screen === 'recruiter' && (
        <div className="auth-form recruiter-form active">
          <button className="back-btn-top" onClick={goBack}>
            ←
          </button>
          <div className="left-panel">
            <h2 className="panel-title">RECRUITER PORTAL</h2>
            <p className="panel-description">
              Find exceptional talent and build amazing teams. Connect with the best candidates in your field.
            </p>
            <img src="/login.png" alt="Illustration" className="panel-image" />
          </div>
          <div className="right-panel">
            <h2 className="form-title">Recruiter Signup</h2>
            <p className="form-subtitle">Create your recruiter account</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Company Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <p className="alt-link">
              Looking for jobs?{' '}
              <a href="#" onClick={switchToApplicant}>
                Sign up as Applicant
              </a>
            </p>
            <p className="alt-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Signup;