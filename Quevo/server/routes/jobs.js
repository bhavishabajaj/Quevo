import express from 'express';
import { authMiddleware, isRecruiter, isApplicant } from '../middleware/auth.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { location, workType, jobType, skills, page = 1, limit = 10 } = req.query;
    let query = { status: 'active' };

    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (workType) {
      query.workType = workType;
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name companyName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name companyName email companyWebsite')
      .populate('applications.applicant', 'name email skills experience');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create job (recruiters only)
router.post('/', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user.userId
    };

    const job = new Job(jobData);
    await job.save();

    // Add job to recruiter's posted jobs
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { postedJobs: job._id } }
    );

    await job.populate('postedBy', 'name companyName email');

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update job (recruiters only)
router.put('/:id', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user.userId
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    Object.assign(job, req.body);
    await job.save();

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete job (recruiters only)
router.delete('/:id', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user.userId
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    // Remove job from recruiter's posted jobs
    await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { postedJobs: job._id } }
    );

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Apply to job (applicants only)
router.post('/:id/apply', authMiddleware, isApplicant, async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      app => app.applicant.toString() === req.user.userId
    );

    if (alreadyApplied) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    // Add application
    job.applications.push({
      applicant: req.user.userId,
      coverLetter: coverLetter || '',
      status: 'pending'
    });

    await job.save();

    // Add job to applicant's applied jobs
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { appliedJobs: job._id } }
    );

    res.json({ message: 'Application submitted successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update application status (recruiters only)
router.put('/:jobId/applications/:applicationId', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findOne({
      _id: req.params.jobId,
      postedBy: req.user.userId
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    const application = job.applications.id(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await job.save();

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recruiter's posted jobs
router.get('/recruiter/my-jobs', authMiddleware, isRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId })
      .populate('applications.applicant', 'name email skills experience')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get applicant's applied jobs
router.get('/applicant/my-applications', authMiddleware, isApplicant, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: 'appliedJobs',
      populate: {
        path: 'postedBy',
        select: 'name companyName email'
      }
    });

    const applications = user.appliedJobs.map(job => {
      const application = job.applications.find(
        app => app.applicant.toString() === req.user.userId
      );
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

export default router;
