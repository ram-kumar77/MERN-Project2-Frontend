import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for logging
api.interceptors.request.use(config => {
  console.log('Making API call to:', config.url);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor for logging
api.interceptors.response.use(response => {
  console.log('API response from:', response.config.url);
  return response;
}, error => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

export const baseURL = process.env.REACT_APP_API_BASE_URL;

export default api;
