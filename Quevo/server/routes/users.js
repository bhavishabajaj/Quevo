import express from 'express';
import { authMiddleware, isApplicant, isRecruiter } from '../middleware/auth.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

const router = express.Router();

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('appliedJobs')
      .populate('postedJobs');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update here
    delete updates.email; // Don't allow email update here
    delete updates.role; // Don't allow role change

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all applicants (for recruiters)
router.get('/applicants', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const { skills, location, experience } = req.query;
    let query = { role: 'applicant' };

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (experience) {
      query.experience = experience;
    }

    const applicants = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get applicant by ID
router.get('/applicants/:id', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const applicant = await User.findOne({
      _id: req.params.id,
      role: 'applicant'
    }).select('-password');

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    // Increment profile views
    applicant.profileViews += 1;
    await applicant.save();

    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update applicant skills
router.put('/skills', authMiddleware, isApplicant, async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { skills } },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
