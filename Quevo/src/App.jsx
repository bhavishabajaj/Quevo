import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('site-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="App">
      <BackgroundAnimation />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
