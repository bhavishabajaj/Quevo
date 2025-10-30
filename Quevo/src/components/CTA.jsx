import React from 'react';

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-badge">▶ Ready to start?</div>
          <h2>Ready to Transform Your Career?</h2>
          <p>Join thousands of job seekers and companies already using Quevo to find their perfect match.</p>
          
          <div className="cta-buttons">
            <a href="/signup" className="btn-large primary">Get Started Today →</a>
            <a href="#features" className="btn-large secondary">Learn More</a>
          </div>

          <div className="cta-features">
            <div className="cta-feature-item">
              <span className="check-icon">✓</span>
              <span>Free to start</span>
            </div>
            <div className="cta-feature-item">
              <span className="check-icon">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="cta-feature-item">
              <span className="check-icon">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
