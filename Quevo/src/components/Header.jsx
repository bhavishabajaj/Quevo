import React, { useState, useEffect } from 'react';

const Header = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <a href="#" className="logo">Quevo.</a>
        
        {/* Desktop Navigation */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#" onClick={() => setMobileMenuOpen(false)}>For job seekers</a></li>
          <li><a href="#" onClick={() => setMobileMenuOpen(false)}>For Companies</a></li>
          <li className="mobile-only">
            <button 
              className="btn-outline mobile-theme-btn"
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
            >
              {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </li>
        </ul>

        <div className="auth-buttons">
          <button 
            id="theme-toggle" 
            aria-label="Toggle theme" 
            aria-pressed={theme === 'light'}
            className="btn-outline theme-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="#" className="btn-outline">Log in</a>
          <a href="#" className="btn-primary">Sign up</a>
        </div>

        {/* Mobile Menu Hamburger */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;
