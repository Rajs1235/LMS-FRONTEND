import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lms-backend-thkb.onrender.com/api/v1', 
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to attach the token for protected admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loanService = {
  // Module 1 & 3
  getProducts: async () => (await api.get('/loans/product')).data,
  applyLoan: async (loanData) => (await api.post('/loans/apply', loanData)).data,
  
  // Module 2, 4 & 5
  getLoans: async () => (await api.get('/loans/list')).data,
  
  // Dynamic update for Status (String) OR KYC (Boolean)
  updateStatus: async (id, data) => (await api.patch(`/loans/update-status/${id}`, data)).data,

  // Admin Auth Logic
  register: (data) => api.post('/admin/register', data),
  login: (data) => api.post('/admin/login', data),
};

export default api;