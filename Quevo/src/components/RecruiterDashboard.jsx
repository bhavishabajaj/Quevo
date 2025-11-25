import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
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
    if (parsedUser.role !== 'recruiter') {
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
    <div className="recruiter-dashboard-container">
      <div className="recruiter-dashboard-header">
        <div className="recruiter-dashboard-nav">
          <h1 className="recruiter-dashboard-logo">Quevo</h1>
          <div className="recruiter-dashboard-user">
            <span className="recruiter-user-welcome">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="recruiter-logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="recruiter-dashboard-content">
        <div className="recruiter-dashboard-sidebar">
          <nav className="recruiter-sidebar-nav">
            <a href="#" className="recruiter-nav-item active">
              <span className="recruiter-nav-icon">🏠</span>
              Dashboard
            </a>
            <a href="#" className="recruiter-nav-item">
              <span className="recruiter-nav-icon">💼</span>
              Job Postings
            </a>
            <a href="#" className="recruiter-nav-item">
              <span className="recruiter-nav-icon">👥</span>
              Candidates
            </a>
            <a href="#" className="recruiter-nav-item">
              <span className="recruiter-nav-icon">📊</span>
              Analytics
            </a>
            <a href="#" className="recruiter-nav-item">
              <span className="recruiter-nav-icon">💬</span>
              Messages
            </a>
            <a href="#" className="recruiter-nav-item">
              <span className="recruiter-nav-icon">⚙️</span>
              Settings
            </a>
          </nav>
        </div>

        <div className="recruiter-dashboard-main">
          <div className="recruiter-welcome-section">
            <h2>Welcome Back, {user.name}! 🚀</h2>
            <p>Here's an overview of your recruitment activities.</p>
            <button className="btn-post-job">+ Post New Job</button>
          </div>

          <div className="recruiter-stats-grid">
            <div className="recruiter-stat-card">
              <div className="recruiter-stat-icon recruiter-primary">💼</div>
              <div className="recruiter-stat-info">
                <h3>Active Jobs</h3>
                <p className="recruiter-stat-number">12</p>
                <span className="recruiter-stat-change positive">+2 this month</span>
              </div>
            </div>

            <div className="recruiter-stat-card">
              <div className="recruiter-stat-icon recruiter-secondary">👥</div>
              <div className="recruiter-stat-info">
                <h3>Total Candidates</h3>
                <p className="recruiter-stat-number">384</p>
                <span className="recruiter-stat-change positive">+47 new</span>
              </div>
            </div>

            <div className="recruiter-stat-card">
              <div className="recruiter-stat-icon recruiter-accent">📨</div>
              <div className="recruiter-stat-info">
                <h3>Applications</h3>
                <p className="recruiter-stat-number">156</p>
                <span className="recruiter-stat-change positive">+23 today</span>
              </div>
            </div>

            <div className="recruiter-stat-card">
              <div className="recruiter-stat-icon recruiter-highlight">✓</div>
              <div className="recruiter-stat-info">
                <h3>Hired</h3>
                <p className="recruiter-stat-number">28</p>
                <span className="recruiter-stat-change neutral">This quarter</span>
              </div>
            </div>
          </div>

          <div className="recruiter-dashboard-section">
            <h3>Active Job Postings</h3>
            <div className="recruiter-jobs-list">
              <div className="recruiter-job-card">
                <div className="recruiter-job-header">
                  <div className="recruiter-job-info">
                    <h4>Senior Frontend Developer</h4>
                    <p className="recruiter-job-meta">Posted 5 days ago • Remote</p>
                  </div>
                  <span className="recruiter-job-status active">Active</span>
                </div>
                <div className="recruiter-job-stats">
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Applications</span>
                    <span className="stat-value">42</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">1,234</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Shortlisted</span>
                    <span className="stat-value">8</span>
                  </div>
                </div>
                <div className="recruiter-job-actions">
                  <button className="recruiter-btn-view">View Candidates</button>
                  <button className="recruiter-btn-edit">Edit Job</button>
                </div>
              </div>

              <div className="recruiter-job-card">
                <div className="recruiter-job-header">
                  <div className="recruiter-job-info">
                    <h4>Product Designer</h4>
                    <p className="recruiter-job-meta">Posted 2 weeks ago • Hybrid</p>
                  </div>
                  <span className="recruiter-job-status active">Active</span>
                </div>
                <div className="recruiter-job-stats">
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Applications</span>
                    <span className="stat-value">28</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">892</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Shortlisted</span>
                    <span className="stat-value">5</span>
                  </div>
                </div>
                <div className="recruiter-job-actions">
                  <button className="recruiter-btn-view">View Candidates</button>
                  <button className="recruiter-btn-edit">Edit Job</button>
                </div>
              </div>

              <div className="recruiter-job-card">
                <div className="recruiter-job-header">
                  <div className="recruiter-job-info">
                    <h4>Full Stack Engineer</h4>
                    <p className="recruiter-job-meta">Posted 1 month ago • On-site</p>
                  </div>
                  <span className="recruiter-job-status filled">Filled</span>
                </div>
                <div className="recruiter-job-stats">
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Applications</span>
                    <span className="stat-value">86</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">2,156</span>
                  </div>
                  <div className="recruiter-job-stat">
                    <span className="stat-label">Hired</span>
                    <span className="stat-value">1</span>
                  </div>
                </div>
                <div className="recruiter-job-actions">
                  <button className="recruiter-btn-view">View Details</button>
                  <button className="recruiter-btn-archive">Archive</button>
                </div>
              </div>
            </div>
          </div>

          <div className="recruiter-dashboard-section">
            <h3>Top Candidates</h3>
            <div className="recruiter-candidates-list">
              <div className="recruiter-candidate-card">
                <div className="recruiter-candidate-header">
                  <div className="recruiter-candidate-avatar">👨‍💻</div>
                  <div className="recruiter-candidate-info">
                    <h4>Alex Johnson</h4>
                    <p className="recruiter-candidate-role">Senior React Developer</p>
                  </div>
                  <span className="recruiter-match-badge">98% Match</span>
                </div>
                <div className="recruiter-candidate-skills">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">GraphQL</span>
                </div>
                <div className="recruiter-candidate-actions">
                  <button className="recruiter-btn-profile">View Profile</button>
                  <button className="recruiter-btn-contact">Contact</button>
                </div>
              </div>

              <div className="recruiter-candidate-card">
                <div className="recruiter-candidate-header">
                  <div className="recruiter-candidate-avatar">👩‍🎨</div>
                  <div className="recruiter-candidate-info">
                    <h4>Sarah Williams</h4>
                    <p className="recruiter-candidate-role">UX/UI Designer</p>
                  </div>
                  <span className="recruiter-match-badge">95% Match</span>
                </div>
                <div className="recruiter-candidate-skills">
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">UI Design</span>
                  <span className="skill-tag">UX Research</span>
                  <span className="skill-tag">Prototyping</span>
                </div>
                <div className="recruiter-candidate-actions">
                  <button className="recruiter-btn-profile">View Profile</button>
                  <button className="recruiter-btn-contact">Contact</button>
                </div>
              </div>

              <div className="recruiter-candidate-card">
                <div className="recruiter-candidate-header">
                  <div className="recruiter-candidate-avatar">👨‍💼</div>
                  <div className="recruiter-candidate-info">
                    <h4>Michael Chen</h4>
                    <p className="recruiter-candidate-role">Product Manager</p>
                  </div>
                  <span className="recruiter-match-badge">92% Match</span>
                </div>
                <div className="recruiter-candidate-skills">
                  <span className="skill-tag">Product Strategy</span>
                  <span className="skill-tag">Agile</span>
                  <span className="skill-tag">Analytics</span>
                  <span className="skill-tag">Leadership</span>
                </div>
                <div className="recruiter-candidate-actions">
                  <button className="recruiter-btn-profile">View Profile</button>
                  <button className="recruiter-btn-contact">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
