import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = 'Where Talent Meets Opportunity';
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Static stats without animation
  const stats = { jobs: 10000, companies: 500, hires: 5000 };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-container">
          {/* Premium Badge */}
          <div className="hero-badge-premium fade-in-up">
            <span className="sparkle">⭐</span>
            <span className="badge-text">Join 500+ Leading Companies</span>
            <span className="sparkle">⭐</span>
          </div>
          
          {/* Main Heading with Typing Effect */}
          <h1 className="hero-title typing-animation">
            {typedText}
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
          </h1>
          
          {/* Subheading */}
          <p className="hero-subtitle fade-in-up">
            The revolutionary platform connecting exceptional talent with dream opportunities.
          </p>
          <p className="hero-description fade-in-up delay-1">
            <span className="highlight-gradient">One Platform. Two Winners.</span> Seamless hiring meets effortless job discovery.
          </p>
          
          {/* CTA Buttons */}
          <div className="hero-buttons fade-in-up delay-2">
            <a href="/signup" className="btn-hero primary">
              <span className="btn-icon">▶</span>
              <span>Start Your Journey</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="/signup" className="btn-hero secondary">
              <span className="btn-icon">💼</span>
              <span>Post a Job</span>
            </a>
          </div>
          
          {/* Animated Statistics with Better Design */}
          <div className="hero-stats-premium fade-in-up delay-3">
            <div className="stat-card">
              <div className="stat-icon">�</div>
              <div className="stat-number-large">{stats.jobs.toLocaleString()}+</div>
              <div className="stat-label-large">Active Jobs</div>
              <div className="stat-trend">↑ 23% this month</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🏢</div>
              <div className="stat-number-large">{stats.companies.toLocaleString()}+</div>
              <div className="stat-label-large">Companies</div>
              <div className="stat-trend">↑ Growing daily</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✓</div>
              <div className="stat-number-large">{stats.hires.toLocaleString()}+</div>
              <div className="stat-label-large">Successful Hires</div>
              <div className="stat-trend">↑ 95% match rate</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-section fade-in-up delay-4">
            <p className="trust-label">Trusted by Industry Leaders</p>
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="check-mark">✓</span>
                <span>Verified Companies</span>
              </div>
              <div className="trust-badge">
                <span className="check-mark">✓</span>
                <span>Secure Platform</span>
              </div>
              <div className="trust-badge">
                <span className="check-mark">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="hero-decoration decoration-1"></div>
      <div className="hero-decoration decoration-2"></div>
      <div className="hero-decoration decoration-3"></div>
    </section>
  );
};

export default Hero;
