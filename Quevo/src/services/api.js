const API_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
  }
};

// User APIs
export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
    return data;
  },

  updateProfile: async (updates) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update profile');
    return data;
  },

  updateSkills: async (skills) => {
    const response = await fetch(`${API_URL}/users/skills`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ skills })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update skills');
    return data;
  },

  getApplicants: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/users/applicants?${queryString}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch applicants');
    return data;
  },

  getApplicantById: async (id) => {
    const response = await fetch(`${API_URL}/users/applicants/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch applicant');
    return data;
  }
};

// Job APIs
export const jobAPI = {
  getAllJobs: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/jobs?${queryString}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch jobs');
    return data;
  },

  getJobById: async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch job');
    return data;
  },

  createJob: async (jobData) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create job');
    return data;
  },

  updateJob: async (id, updates) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update job');
    return data;
  },

  deleteJob: async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete job');
    return data;
  },

  applyToJob: async (jobId, coverLetter = '') => {
    const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ coverLetter })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to apply');
    return data;
  },

  updateApplicationStatus: async (jobId, applicationId, status) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}/applications/${applicationId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update status');
    return data;
  },

  getMyJobs: async () => {
    const response = await fetch(`${API_URL}/jobs/recruiter/my-jobs`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch jobs');
    return data;
  },

  getMyApplications: async () => {
    const response = await fetch(`${API_URL}/jobs/applicant/my-applications`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch applications');
    return data;
  }
};
