import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
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

export const isRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ error: 'Access denied. Recruiter only.' });
  }
  next();
};

export const isApplicant = (req, res, next) => {
  if (req.user.role !== 'applicant') {
    return res.status(403).json({ error: 'Access denied. Applicant only.' });
  }
  next();
};
