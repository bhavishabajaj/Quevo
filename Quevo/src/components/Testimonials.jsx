import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      image: '👩‍💻',
      text: 'Quevo made my job search incredibly easy. I received multiple interview requests within the first week and landed my dream job in less than a month!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'HR Manager',
      company: 'StartUp Inc',
      image: '👨‍💼',
      text: 'As a hiring manager, Quevo has streamlined our recruitment process. The quality of candidates is exceptional, and the platform is intuitive to use.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Designer',
      company: 'Design Studio',
      image: '👩‍🎨',
      text: 'The reverse job portal concept is brilliant! Instead of sending hundreds of applications, companies found me. It saved me so much time and stress.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'CTO',
      company: 'Innovation Labs',
      image: '👨‍💻',
      text: 'We hired three amazing developers through Quevo in just two weeks. The matching algorithm really understands our needs and delivers quality candidates.',
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible, testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="section-header">
          <span className="section-badge">💬 Testimonials</span>
          <h2>What Our Users Say</h2>
          <p className="section-subtitle">Join thousands of satisfied job seekers and companies</p>
        </div>

        <div className="testimonials-carousel">
          <div className="testimonial-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.image}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
