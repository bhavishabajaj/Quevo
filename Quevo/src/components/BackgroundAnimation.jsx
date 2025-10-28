import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced || !containerRef.current) return;

    const colors = [
      'linear-gradient(45deg, rgba(147,51,234,0.12), rgba(126,34,206,0.06))',
      'linear-gradient(45deg, rgba(126,34,206,0.09), rgba(109,40,217,0.04))'
    ];

    const count = 6;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = 40 + Math.round(Math.random() * 120);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.round(Math.random() * 95)}%`;
      particle.style.top = `${Math.round(Math.random() * 95)}%`;
      particle.style.background = colors[i % colors.length];
      particle.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
      particle.style.opacity = `${0.15 + Math.random() * 0.5}`;
      particles.push(particle);
      containerRef.current.appendChild(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="bg-animation"></div>;
};

export default BackgroundAnimation;
