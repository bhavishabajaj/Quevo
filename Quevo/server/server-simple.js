import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data file paths
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const jobsFile = path.join(dataDir, 'jobs.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}
if (!fs.existsSync(jobsFile)) {
  fs.writeFileSync(jobsFile, JSON.stringify([]));
}

// Helper functions to read/write data
const readUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
const readJobs = () => JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
const writeJobs = (jobs) => fs.writeFileSync(jobsFile, JSON.stringify(jobs, null, 2));

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const users = readUsers();
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role,
      skills: [],
      appliedJobs: [],
      postedJobs: [],
      profileViews: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    writeUsers(users);
    
    // Create token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
app.get('/api/users/me', authMiddleware, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
app.put('/api/users/profile', authMiddleware, (req, res) => {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const updates = req.body;
    delete updates.password;
    delete updates.email;
    delete updates.role;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    writeUsers(users);
    
    const { password, ...userWithoutPassword } = users[userIndex];
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update skills
app.put('/api/users/skills', authMiddleware, (req, res) => {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex].skills = req.body.skills || [];
    writeUsers(users);
    
    const { password, ...userWithoutPassword } = users[userIndex];
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all applicants (for recruiters)
app.get('/api/users/applicants', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const users = readUsers();
    const applicants = users
      .filter(u => u.role === 'applicant')
      .map(({ password, ...user }) => user);
    
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  try {
    const jobs = readJobs();
    const activeJobs = jobs.filter(j => j.status === 'active');
    res.json({ jobs: activeJobs, total: activeJobs.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create job (recruiters only)
app.post('/api/jobs', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const jobs = readJobs();
    const users = readUsers();
    
    const job = {
      id: Date.now().toString(),
      ...req.body,
      postedBy: req.user.userId,
      applications: [],
      status: 'active',
      views: 0,
      createdAt: new Date().toISOString()
    };
    
    jobs.push(job);
    writeJobs(jobs);
    
    // Add to user's posted jobs
    const userIndex = users.findIndex(u => u.id === req.user.userId);
    if (userIndex !== -1) {
      users[userIndex].postedJobs.push(job.id);
      writeUsers(users);
    }
    
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Apply to job (applicants only)
app.post('/api/jobs/:id/apply', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'applicant') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const jobs = readJobs();
    const users = readUsers();
    
    const jobIndex = jobs.findIndex(j => j.id === req.params.id);
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check if already applied
    const alreadyApplied = jobs[jobIndex].applications.some(
      app => app.applicant === req.user.userId
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }
    
    jobs[jobIndex].applications.push({
      id: Date.now().toString(),
      applicant: req.user.userId,
      coverLetter: req.body.coverLetter || '',
      status: 'pending',
      appliedAt: new Date().toISOString()
    });
    
    writeJobs(jobs);
    
    // Add to user's applied jobs
    const userIndex = users.findIndex(u => u.id === req.user.userId);
    if (userIndex !== -1) {
      users[userIndex].appliedJobs.push(req.params.id);
      writeUsers(users);
    }
    
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recruiter's jobs
app.get('/api/jobs/recruiter/my-jobs', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const jobs = readJobs();
    const myJobs = jobs.filter(j => j.postedBy === req.user.userId);
    res.json(myJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get applicant's applications
app.get('/api/jobs/applicant/my-applications', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'applicant') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const jobs = readJobs();
    const users = readUsers();
    const user = users.find(u => u.id === req.user.userId);
    
    const applications = jobs
      .filter(j => user.appliedJobs.includes(j.id))
      .map(job => {
        const application = job.applications.find(app => app.applicant === req.user.userId);
        return {
          job,
          status: application?.status,
          appliedAt: application?.appliedAt
        };
      });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Quevo API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`💾 Using file-based storage (no MongoDB required)`);
});
