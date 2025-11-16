import axios from './axios';

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  login: (credentials) => axios.post('/auth/login', credentials),
  register: (userData) => axios.post('/auth/register', userData),
  logout: () => axios.post('/auth/logout'),
  forgotPassword: (email) => axios.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    axios.post('/auth/reset-password', { token, password }),
  getProfile: () => axios.get('/auth/profile'),
  updateProfile: (data) => axios.put('/auth/profile', data),
};

// ============================================
// GALLERY API
// ============================================
export const galleryAPI = {
  getAll: (params) => axios.get('/gallery', { params }),
  getById: (id) => axios.get(`/gallery/${id}`),
  create: (formData) =>
    axios.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axios.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => axios.delete(`/gallery/${id}`),
  updateStatus: (id, status) =>
    axios.patch(`/gallery/${id}/status`, { status }),
};

// ============================================
// EVENTS API
// ============================================
export const eventsAPI = {
  getAll: (params) => axios.get('/events', { params }),
  getById: (id) => axios.get(`/events/${id}`),
  create: (formData) =>
    axios.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axios.put(`/events/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => axios.delete(`/events/${id}`),
  updateStatus: (id, status) =>
    axios.patch(`/events/${id}/status`, { status }),
};

// ============================================
// ADMISSIONS API
// ============================================
export const admissionsAPI = {
  getAll: (params) => axios.get('/admissions', { params }),
  getById: (id) => axios.get(`/admissions/${id}`),
  create: (data) => axios.post('/admissions', data),
  update: (id, data) => axios.put(`/admissions/${id}`, data),
  delete: (id) => axios.delete(`/admissions/${id}`),
  updateStatus: (id, status) =>
    axios.patch(`/admissions/${id}/status`, { status }),
  exportToCSV: () =>
    axios.get('/admissions/export', { responseType: 'blob' }),
};

// ============================================
// CONTACT API
// ============================================
export const contactAPI = {
  getAll: (params) => axios.get('/contact', { params }),
  getById: (id) => axios.get(`/contact/${id}`),
  create: (data) => axios.post('/contact', data),
  update: (id, data) => axios.put(`/contact/${id}`, data),
  delete: (id) => axios.delete(`/contact/${id}`),
  updateStatus: (id, status) =>
    axios.patch(`/contact/${id}/status`, { status }),
  markAsRead: (id) => axios.patch(`/contact/${id}/read`),
};

// ============================================
// USERS API (Admin only)
// ============================================
export const usersAPI = {
  getAll: (params) => axios.get('/users', { params }),
  getById: (id) => axios.get(`/users/${id}`),
  create: (data) => axios.post('/users', data),
  update: (id, data) => axios.put(`/users/${id}`, data),
  delete: (id) => axios.delete(`/users/${id}`),
  updateStatus: (id, status) =>
    axios.patch(`/users/${id}/status`, { status }),
};

// ============================================
// DASHBOARD API
// ============================================
export const dashboardAPI = {
  getStats: () => axios.get('/dashboard/stats'),
  getRecentActivities: () => axios.get('/dashboard/activities'),
  getAnalytics: (params) => axios.get('/dashboard/analytics', { params }),
};

export default {
  authAPI,
  galleryAPI,
  eventsAPI,
  admissionsAPI,
  contactAPI,
  usersAPI,
  dashboardAPI,
};