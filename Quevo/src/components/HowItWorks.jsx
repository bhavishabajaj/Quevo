import React, { useRef, useEffect, useState } from 'react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up in minutes and build a compelling profile that showcases your skills, experience, and what makes you unique.',
      icon: '👤',
      color: '#9333ea'
    },
    {
      number: '02',
      title: 'Get Discovered',
      description: 'Our AI-powered matching algorithm connects you with relevant opportunities based on your profile and preferences.',
      icon: '🔍',
      color: '#a855f7'
    },
    {
      number: '03',
      title: 'Connect & Interview',
      description: 'Receive interview requests from companies or apply directly. Schedule interviews and communicate seamlessly.',
      icon: '💬',
      color: '#c084fc'
    },
    {
      number: '04',
      title: 'Land Your Dream Job',
      description: 'Accept the perfect offer and start your new journey. Track everything in your dashboard from start to finish.',
      icon: '🎉',
      color: '#d8b4fe'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setActiveStep(index);
              }, index * 800);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works" ref={sectionRef}>
      <div className="how-it-works-container">
        <div className="section-header">
          <span className="section-badge">📋 Process</span>
          <h2>How It Works</h2>
          <p className="section-subtitle">Get started in four simple steps</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${index <= activeStep ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="step-content">
                <div className="step-icon" style={{ background: `linear-gradient(135deg, ${step.color}, #7c3aed)` }}>
                  <span>{step.icon}</span>
                </div>
                <div className="step-info">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${index < activeStep ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
