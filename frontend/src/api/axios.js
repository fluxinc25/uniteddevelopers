import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ud_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const projectAPI = {
  getAll: (params) => api.get('/api/projects', { params }),
  getBySlug: (slug) => api.get(`/api/projects/${slug}`),
};

export const skillAPI = {
  getAll: (params) => api.get('/api/skills', { params }),
};

export const experienceAPI = {
  getAll: () => api.get('/api/experiences'),
};

export const testimonialAPI = {
  getAll: () => api.get('/api/testimonials'),
};

export const messageAPI = {
  submit: (data) => api.post('/api/messages', data),
};

export const heroAPI = {
  get: () => api.get('/api/hero'),
};