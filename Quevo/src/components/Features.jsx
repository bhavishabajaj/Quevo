import React, { useRef, useEffect, useState } from 'react';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuresRef = useRef(null);

  const features = [
    {
      icon: '🎯',
      title: 'For Job Seekers',
      description: 'Create your profile, showcase your skills, and let opportunities come to you.',
      stats: '5000+ profiles'
    },
    {
      icon: '🚀',
      title: 'For Companies',
      description: 'Post jobs, browse talent profiles, and connect with your next great hire.',
      stats: '500+ companies'
    },
    {
      icon: '⚡',
      title: 'Fast & Efficient',
      description: 'Skip the endless scrolling. Our smart matching brings the right people together.',
      stats: '24hr avg response'
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse move parallax effect
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  };

  return (
    <section className="features" ref={featuresRef}>
      <div className="features-container">
        <h2 className="scroll-reveal">Why Choose Quevo?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-stats">{feature.stats}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
