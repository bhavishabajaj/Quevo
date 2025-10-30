import React, { useRef, useEffect, useState } from 'react';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuresRef = useRef(null);

  const features = [
    {
      icon: '👤',
      title: 'For Job Seekers',
      description: 'Create your profile, showcase your skills, and let opportunities come to you. Build your professional brand with our intuitive profile builder.',
      stats: '5000+ profiles',
      benefits: ['AI-powered matching', 'Profile visibility boost', '24/7 support']
    },
    {
      icon: '🏢',
      title: 'For Companies',
      description: 'Post jobs, browse talent profiles, and connect with your next great hire. Access a curated pool of verified professionals.',
      stats: '500+ companies',
      benefits: ['Smart candidate search', 'ATS integration', 'Bulk hiring tools']
    },
    {
      icon: '⚡',
      title: 'Fast & Efficient',
      description: 'Skip the endless scrolling. Our smart matching brings the right people together with intelligent algorithms and real-time notifications.',
      stats: '24hr avg response',
      benefits: ['Instant notifications', 'Quick apply process', 'Mobile-first design']
    },
    {
      icon: '�',
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. Control who sees your profile and maintain complete privacy throughout your job search.',
      stats: '100% secure',
      benefits: ['End-to-end encryption', 'GDPR compliant', 'Privacy controls']
    },
    {
      icon: '�',
      title: 'Analytics & Insights',
      description: 'Track your job search progress with detailed analytics. Get insights on profile views, application status, and market trends.',
      stats: 'Real-time data',
      benefits: ['Performance metrics', 'Market insights', 'Competitor analysis']
    },
    {
      icon: '💼',
      title: 'Community Support',
      description: 'Join a thriving community of professionals. Network, share knowledge, and grow together with industry experts.',
      stats: '10k+ members',
      benefits: ['Expert mentorship', 'Networking events', 'Skill workshops']
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
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
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
        <div className="section-header">
          <span className="section-badge">⭐ Features</span>
          <h2 className="scroll-reveal">Why Choose Quevo?</h2>
          <p className="section-subtitle">Everything you need to succeed in your hiring journey or job search</p>
        </div>
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
              <div className="feature-benefits">
                {feature.benefits.map((benefit, idx) => (
                  <span key={idx} className="benefit-tag">✓ {benefit}</span>
                ))}
              </div>
              <div className="feature-stats">{feature.stats}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
