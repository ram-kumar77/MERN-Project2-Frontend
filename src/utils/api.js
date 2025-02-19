import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://mern-project2-backend-2.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const baseURL = 'https://mern-project2-backend-2.onrender.com';

export default api;
