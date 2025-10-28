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
      }, 100);
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

  // Stats counter animation
  const [stats, setStats] = useState({ jobs: 0, companies: 0, hires: 0 });
  const targetStats = { jobs: 10000, companies: 500, hires: 5000 };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        jobs: Math.floor(targetStats.jobs * progress),
        companies: Math.floor(targetStats.companies * progress),
        hires: Math.floor(targetStats.hires * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-container">
          {/* Badge */}
          <div className="hero-badge fade-in-up">
            <span className="badge-text">🚀 Trusted by 500+ companies worldwide</span>
          </div>
          
          <h1 className="typing-animation">
            {typedText}
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
          </h1>
          <p className="fade-in-up">
            Whether you're hiring or getting hired, Quevo makes it effortless. <br />
            <span className="highlight-text">One Platform. Two Winners.</span>
          </p>
          <div className="hero-buttons fade-in-up delay-1">
            <a href="/signup" className="btn-large primary">Find your next role →</a>
            <a href="/signup" className="btn-large secondary">Post a job</a>
          </div>
          
          {/* Animated Statistics */}
          <div className="hero-stats fade-in-up delay-2">
            <div className="stat-item">
              <div className="stat-number">{stats.jobs.toLocaleString()}+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.companies.toLocaleString()}+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.hires.toLocaleString()}+</div>
              <div className="stat-label">Successful Hires</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
