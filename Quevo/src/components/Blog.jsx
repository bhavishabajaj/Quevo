import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BlogStyles.css';

const blogArticles = [
  {
    id: 1,
    title: "10 Tips for Landing Your Dream Startup Job",
    excerpt: "Discover the insider strategies that will help you stand out in the competitive startup job market and secure your ideal role.",
    category: "Career Advice",
    author: "Sarah Chen",
    date: "Oct 20, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Remote Work Revolution: Best Practices for 2025",
    excerpt: "Learn how to thrive in a remote-first environment with these proven tips from successful distributed teams.",
    category: "Remote Work",
    author: "Michael Park",
    date: "Oct 18, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Understanding Startup Equity: A Complete Guide",
    excerpt: "Navigate the complex world of stock options, RSUs, and equity compensation with confidence.",
    category: "Compensation",
    author: "Emily Rodriguez",
    date: "Oct 15, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: true
  },
  {
    id: 4,
    title: "How AI is Transforming Tech Recruitment",
    excerpt: "Explore the latest trends in AI-powered hiring and what it means for job seekers in 2025.",
    category: "Tech Trends",
    author: "David Kim",
    date: "Oct 12, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Building Your Personal Brand as a Developer",
    excerpt: "Stand out in the tech industry by creating a compelling online presence that attracts opportunities.",
    category: "Career Advice",
    author: "Alex Thompson",
    date: "Oct 10, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Startup Culture: What to Expect in Your First 90 Days",
    excerpt: "Navigate your first three months at a startup with these insights from industry veterans.",
    category: "Startup Life",
    author: "Jessica Martinez",
    date: "Oct 8, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    featured: false
  },
  {
    id: 7,
    title: "Negotiating Your Salary: Do's and Don'ts",
    excerpt: "Master the art of salary negotiation with these proven strategies from top recruiters.",
    category: "Compensation",
    author: "Robert Chang",
    date: "Oct 5, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    featured: false
  },
  {
    id: 8,
    title: "The Future of Work: Hybrid Models Explained",
    excerpt: "Understand the pros and cons of hybrid work arrangements and how to make them work for you.",
    category: "Remote Work",
    author: "Lisa Wang",
    date: "Oct 3, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    featured: false
  },
  {
    id: 9,
    title: "From Corporate to Startup: Making the Leap",
    excerpt: "Real stories and advice from professionals who successfully transitioned from big tech to startups.",
    category: "Career Advice",
    author: "Tom Anderson",
    date: "Oct 1, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    featured: false
  }
];

const categories = ['All', 'Career Advice', 'Remote Work', 'Compensation', 'Tech Trends', 'Startup Life'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCards, setVisibleCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const cardsRef = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const filteredArticles = selectedCategory === 'All'
    ? blogArticles
    : blogArticles.filter(article => article.category === selectedCategory);

  const searchedArticles = searchQuery 
    ? filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredArticles;

  const featuredArticles = blogArticles.filter(article => article.featured);
  const regularArticles = searchedArticles.filter(article => !article.featured);

  const ArticleCard = ({ article, index }) => (
    <Link 
      to={`/blog/${article.id}`}
      className={`article-card ${visibleCards.includes(index) ? 'visible' : ''}`}
      ref={el => cardsRef.current[index] = el}
    >
      <div className="article-image">
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className="article-category">{article.category}</span>
        <div className="article-overlay">
          <button className="read-more-btn">Read Article →</button>
        </div>
      </div>
      <div className="article-content">
        <div className="article-tags">
          <span className="tag">#{article.category.replace(' ', '')}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <div className="author-info">
            <div className="author-avatar">{article.author.charAt(0)}</div>
            <div>
              <div className="author-name">{article.author}</div>
              <div className="article-date">{article.date} • {article.readTime}</div>
            </div>
          </div>
          <div className="article-stats">
            <span className="stat-item">👁 {Math.floor(Math.random() * 5 + 1)}k</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="blog-badge">
            <span className="badge-icon">📚</span>
            <span>Knowledge Hub</span>
          </div>
          <h1>Quevo Career Insights</h1>
          <p>Expert advice, industry trends, and actionable tips to accelerate your career growth</p>
          
          {/* Search Bar */}
          <div className="hero-search">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="blog-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Readers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">Weekly</span>
              <span className="stat-label">Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-section">
        <div className="category-container">
          <h3>Browse by Category</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCards([]);
                }}
              >
                <span className="category-icon">
                  {category === 'All' && '📋'}
                  {category === 'Career Advice' && '💼'}
                  {category === 'Remote Work' && '🏠'}
                  {category === 'Compensation' && '💰'}
                  {category === 'Tech Trends' && '🚀'}
                  {category === 'Startup Life' && '⚡'}
                </span>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="article-section featured-section">
          <div className="section-header">
            <div className="section-title">
              <span className="title-icon">⭐</span>
              <h2>Featured Reads</h2>
            </div>
            <p className="section-subtitle">Hand-picked articles by our editors</p>
          </div>
          <div className="article-grid featured-grid">
            {featuredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="article-section">
        <div className="section-header">
          <div className="section-title">
            <span className="title-icon">📰</span>
            <h2>
              {searchQuery 
                ? `Search Results (${searchedArticles.length})` 
                : selectedCategory === 'All' 
                  ? 'Latest Articles' 
                  : `${selectedCategory}`}
            </h2>
          </div>
          {!searchQuery && (
            <p className="section-subtitle">
              {selectedCategory === 'All' 
                ? 'Stay up to date with the latest career insights' 
                : `All articles about ${selectedCategory.toLowerCase()}`}
            </p>
          )}
        </div>
        {searchedArticles.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No articles found</h3>
            <p>Try adjusting your search or browse all categories</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              View All Articles
            </button>
          </div>
        ) : (
          <div className="article-grid">
            {(selectedCategory === 'All' && !searchQuery ? regularArticles : searchedArticles).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-box">
          <div className="newsletter-icon">✉️</div>
          <h2>Never Miss an Insight</h2>
          <p>Join 50,000+ professionals getting career tips, industry insights, and job opportunities delivered weekly.</p>
          
          <div className="newsletter-features">
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Weekly career tips</span>
            </div>
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Exclusive job opportunities</span>
            </div>
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Industry trends & insights</span>
            </div>
          </div>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>
              <span>Subscribe Now</span>
              <span className="arrow">→</span>
            </button>
          </div>
          
          <p className="newsletter-note">🔒 No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Blog;
