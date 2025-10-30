import React, { useState } from 'react';
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

  const filteredArticles = selectedCategory === 'All'
    ? blogArticles
    : blogArticles.filter(article => article.category === selectedCategory);

  const featuredArticles = blogArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const ArticleCard = ({ article }) => (
    <div className="article-card">
      <div className="article-image">
        <img src={article.image} alt={article.title} />
        <span className="article-category">{article.category}</span>
      </div>
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <div>{article.author} • {article.date}</div>
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Quevo Blog</h1>
          <p>Insights, tips, and stories to help you navigate your career journey and land your dream job</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-section">
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'All' && (
        <div className="article-section">
          <h2>Featured Articles</h2>
          <div className="article-grid">
            {featuredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="article-section">
        <h2>{selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}</h2>
        <div className="article-grid">
          {(selectedCategory === 'All' ? regularArticles : filteredArticles).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-box">
          <h2>Stay Updated with Career Insights</h2>
          <p>Get the latest articles, job tips, and startup news delivered to your inbox every week.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
