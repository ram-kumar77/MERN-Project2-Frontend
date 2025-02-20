import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Making API call to:', config.url);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(response => {
  console.log('API response from:', response.config.url);
  return response;
}, error => {
  console.error('Response error:', error);
  
  if (error.response?.status === 401) {
    // Handle unauthorized access
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
});

// Helper function to store token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const baseURL = process.env.REACT_APP_API_BASE_URL;

export default api;
