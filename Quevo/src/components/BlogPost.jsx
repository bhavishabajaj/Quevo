import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BlogPostStyles.css';

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
    featured: true,
    content: `
      <h2>Introduction</h2>
      <p>Landing your dream job at a startup requires more than just a great resume. It takes strategy, persistence, and the right approach. Here are 10 proven tips that will help you stand out from the crowd.</p>
      
      <h3>1. Research the Company Culture</h3>
      <p>Before applying, dive deep into the startup's culture. Read their blog, follow their social media, and understand their values. Startups want people who align with their mission.</p>
      
      <h3>2. Showcase Your Problem-Solving Skills</h3>
      <p>Startups face unique challenges daily. Demonstrate how you've solved similar problems in the past. Use specific examples with measurable outcomes.</p>
      
      <h3>3. Build a Personal Brand</h3>
      <p>Create content, contribute to open-source projects, or start a blog. Show that you're passionate about your field and actively engaged in the community.</p>
      
      <h3>4. Network Strategically</h3>
      <p>Attend startup events, join relevant communities, and connect with people in your target companies. Many startup positions are filled through referrals.</p>
      
      <h3>5. Customize Your Application</h3>
      <p>Generic applications don't work for startups. Tailor your resume and cover letter to each position, highlighting relevant skills and experiences.</p>
      
      <h3>6. Demonstrate Adaptability</h3>
      <p>Startups need team members who can wear multiple hats. Share examples of times you've successfully adapted to change or learned new skills quickly.</p>
      
      <h3>7. Show Your Passion</h3>
      <p>Startup founders want people who are genuinely excited about their product or service. Let your enthusiasm shine through in interviews.</p>
      
      <h3>8. Be Ready for Fast-Paced Interviews</h3>
      <p>Startup hiring processes can move quickly or slowly. Be prepared for multiple rounds, technical assessments, and culture fit interviews.</p>
      
      <h3>9. Ask Smart Questions</h3>
      <p>Inquire about growth opportunities, company roadmap, and team dynamics. This shows you're thinking long-term and serious about the role.</p>
      
      <h3>10. Follow Up Professionally</h3>
      <p>After interviews, send thoughtful thank-you notes. If you don't hear back, a polite follow-up shows persistence without being pushy.</p>
      
      <h2>Conclusion</h2>
      <p>Landing your dream startup job is achievable with the right strategy. Focus on demonstrating value, showing cultural fit, and staying persistent. Good luck!</p>
    `
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
    featured: true,
    content: `
      <h2>The New Era of Work</h2>
      <p>Remote work has transformed from a perk to a standard practice. Here's how to excel in this new paradigm.</p>
      
      <h3>Create a Dedicated Workspace</h3>
      <p>Having a separate area for work helps maintain boundaries and boosts productivity. Invest in ergonomic furniture and good lighting.</p>
      
      <h3>Establish Clear Communication Channels</h3>
      <p>Over-communicate when working remotely. Use video calls for complex discussions and async tools for updates.</p>
      
      <h3>Set Boundaries and Schedules</h3>
      <p>Define your working hours and stick to them. Remote work doesn't mean you're always available.</p>
    `
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
    featured: true,
    content: `
      <h2>Understanding Equity Compensation</h2>
      <p>Equity can be a significant part of your compensation at a startup. Here's everything you need to know.</p>
      
      <h3>Types of Equity</h3>
      <p>Stock options, RSUs, and direct stock purchases each have different implications for taxes and value.</p>
      
      <h3>Vesting Schedules</h3>
      <p>Most equity vests over 4 years with a 1-year cliff. Understand what this means for your financial planning.</p>
      
      <h3>Tax Implications</h3>
      <p>Understanding the tax consequences of exercising options is crucial for financial planning.</p>
    `
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
    featured: false,
    content: `
      <h2>AI in Recruitment: The Future is Now</h2>
      <p>Artificial intelligence is revolutionizing how companies find and hire talent. Here's what you need to know.</p>
      
      <h3>Resume Screening Automation</h3>
      <p>AI systems can now scan thousands of resumes in seconds, identifying top candidates based on specific criteria.</p>
      
      <h3>Skills Assessment</h3>
      <p>Modern AI tools can evaluate technical skills more accurately than traditional methods.</p>
      
      <h3>Interview Analysis</h3>
      <p>AI can analyze video interviews for soft skills, communication patterns, and cultural fit.</p>
    `
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
    featured: false,
    content: `
      <h2>Why Personal Branding Matters</h2>
      <p>In today's competitive tech landscape, having a strong personal brand can open doors to amazing opportunities.</p>
      
      <h3>Create Quality Content</h3>
      <p>Start a blog, make YouTube videos, or write tutorials. Share your knowledge and expertise.</p>
      
      <h3>Contribute to Open Source</h3>
      <p>Contributing to open source projects demonstrates your skills and commitment to the developer community.</p>
      
      <h3>Network Actively</h3>
      <p>Attend conferences, join online communities, and connect with other professionals in your field.</p>
    `
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
    featured: false,
    content: `
      <h2>Your First 90 Days at a Startup</h2>
      <p>Starting at a startup is exciting but can be overwhelming. Here's how to make the most of your first three months.</p>
      
      <h3>Week 1-2: Learn and Absorb</h3>
      <p>Focus on understanding the product, team dynamics, and company culture. Ask lots of questions.</p>
      
      <h3>Week 3-6: Start Contributing</h3>
      <p>Begin taking on small projects and tasks. Show your value early.</p>
      
      <h3>Month 2-3: Make an Impact</h3>
      <p>Take ownership of projects and start making meaningful contributions to the team's goals.</p>
    `
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
    featured: false,
    content: `
      <h2>The Art of Salary Negotiation</h2>
      <p>Negotiating your salary can be intimidating, but it's a crucial skill for career success.</p>
      
      <h3>Do Your Research</h3>
      <p>Know the market rate for your role and experience level. Use sites like Glassdoor and Levels.fyi.</p>
      
      <h3>Don't Give the First Number</h3>
      <p>Let the employer make the first offer. This gives you valuable information for negotiation.</p>
      
      <h3>Consider the Total Package</h3>
      <p>Look beyond base salary. Consider equity, bonuses, benefits, and work-life balance.</p>
    `
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
    featured: false,
    content: `
      <h2>Hybrid Work: The Best of Both Worlds?</h2>
      <p>Hybrid work combines remote and in-office work. Here's how to navigate this new model.</p>
      
      <h3>Benefits of Hybrid Work</h3>
      <p>Flexibility, better work-life balance, and reduced commute time are major advantages.</p>
      
      <h3>Challenges to Consider</h3>
      <p>Coordination, communication, and maintaining company culture can be more difficult.</p>
      
      <h3>Making It Work</h3>
      <p>Set clear expectations, use the right tools, and maintain regular communication with your team.</p>
    `
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
    featured: false,
    content: `
      <h2>Making the Corporate to Startup Transition</h2>
      <p>Moving from a large corporation to a startup is a big decision. Here's what you need to know.</p>
      
      <h3>Why Make the Switch?</h3>
      <p>Greater impact, faster growth, equity opportunities, and learning experiences are common motivators.</p>
      
      <h3>What to Expect</h3>
      <p>Expect less structure, more responsibility, and a faster pace. You'll wear many hats.</p>
      
      <h3>Preparing for the Change</h3>
      <p>Build a financial cushion, research the startup thoroughly, and be ready to adapt quickly.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="not-found">
            <h1>Article Not Found</h1>
            <p>Sorry, we couldn't find the article you're looking for.</p>
            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <div className="post-hero">
        <div className="post-hero-overlay"></div>
        <div className="post-hero-content">
          <Link to="/blog" className="back-link">
            <span>←</span> Back to Blog
          </Link>
          <div className="post-category-badge">{article.category}</div>
          <h1 className="post-title">{article.title}</h1>
          <div className="post-meta">
            <div className="author-section">
              <div className="author-avatar">{article.author.charAt(0)}</div>
              <div className="author-details">
                <div className="author-name">{article.author}</div>
                <div className="post-date">{article.date} • {article.readTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="post-image-container">
        <img src={article.image} alt={article.title} className="post-featured-image" />
      </div>

      {/* Content */}
      <div className="blog-post-container">
        <article className="post-content">
          <div className="post-excerpt">{article.excerpt}</div>
          <div 
            className="post-body" 
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Share Section */}
        <div className="post-share">
          <h3>Share this article</h3>
          <div className="share-buttons">
            <button className="share-btn twitter">🐦 Twitter</button>
            <button className="share-btn linkedin">💼 LinkedIn</button>
            <button className="share-btn facebook">📘 Facebook</button>
            <button className="share-btn copy">🔗 Copy Link</button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="related-articles">
            <h2>Related Articles</h2>
            <div className="related-grid">
              {relatedArticles.map(related => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.id}`}
                  className="related-card"
                >
                  <div className="related-image">
                    <img src={related.image} alt={related.title} />
                  </div>
                  <div className="related-content">
                    <span className="related-category">{related.category}</span>
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="post-cta">
          <h2>Ready to Find Your Dream Job?</h2>
          <p>Join thousands of professionals using Quevo to advance their careers</p>
          <Link to="/signup" className="cta-button">Get Started Free →</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
