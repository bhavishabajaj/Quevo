import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicantDashboard.css';

const ApplicantDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'applicant') {
      navigate('/');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-nav">
          <h1 className="dashboard-logo">Quevo</h1>
          <div className="dashboard-user">
            <span className="user-welcome">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="nav-item active">
              <span className="nav-icon">🏠</span>
              Dashboard
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">👤</span>
              My Profile
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💼</span>
              Job Opportunities
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📝</span>
              Applications
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💬</span>
              Messages
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              Settings
            </a>
          </nav>
        </div>

        <div className="dashboard-main">
          <div className="welcome-section">
            <h2>Welcome Back, {user.name}! 👋</h2>
            <p>Here's what's happening with your job search today.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon applicant-primary">👁️</div>
              <div className="stat-info">
                <h3>Profile Views</h3>
                <p className="stat-number">247</p>
                <span className="stat-change positive">+12% this week</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon applicant-secondary">📨</div>
              <div className="stat-info">
                <h3>Job Offers</h3>
                <p className="stat-number">8</p>
                <span className="stat-change positive">+3 new</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon applicant-accent">📝</div>
              <div className="stat-info">
                <h3>Applications</h3>
                <p className="stat-number">15</p>
                <span className="stat-change neutral">Active</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon applicant-highlight">🎯</div>
              <div className="stat-info">
                <h3>Match Rate</h3>
                <p className="stat-number">89%</p>
                <span className="stat-change positive">Excellent</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Recent Job Opportunities</h3>
            <div className="opportunities-list">
              <div className="opportunity-card">
                <div className="opportunity-header">
                  <div className="company-logo">🏢</div>
                  <div className="opportunity-info">
                    <h4>Senior Frontend Developer</h4>
                    <p className="company-name">TechCorp Inc.</p>
                  </div>
                  <span className="opportunity-badge new">New</span>
                </div>
                <div className="opportunity-details">
                  <span className="detail-item">💰 $120k - $150k</span>
                  <span className="detail-item">📍 Remote</span>
                  <span className="detail-item">⏰ Full-time</span>
                </div>
                <div className="opportunity-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-apply">Apply Now</button>
                </div>
              </div>

              <div className="opportunity-card">
                <div className="opportunity-header">
                  <div className="company-logo">🚀</div>
                  <div className="opportunity-info">
                    <h4>Product Designer</h4>
                    <p className="company-name">Design Studio Pro</p>
                  </div>
                  <span className="opportunity-badge">Match: 95%</span>
                </div>
                <div className="opportunity-details">
                  <span className="detail-item">💰 $100k - $130k</span>
                  <span className="detail-item">📍 New York, NY</span>
                  <span className="detail-item">⏰ Full-time</span>
                </div>
                <div className="opportunity-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-apply">Apply Now</button>
                </div>
              </div>

              <div className="opportunity-card">
                <div className="opportunity-header">
                  <div className="company-logo">💡</div>
                  <div className="opportunity-info">
                    <h4>Full Stack Engineer</h4>
                    <p className="company-name">Innovation Labs</p>
                  </div>
                  <span className="opportunity-badge">Match: 88%</span>
                </div>
                <div className="opportunity-details">
                  <span className="detail-item">💰 $110k - $140k</span>
                  <span className="detail-item">📍 San Francisco, CA</span>
                  <span className="detail-item">⏰ Full-time</span>
                </div>
                <div className="opportunity-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-apply">Apply Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Profile Completion</h3>
            <div className="profile-completion-card">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <p className="progress-text">75% Complete - Add more skills to improve your visibility</p>
              <button className="btn-complete-profile">Complete Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
