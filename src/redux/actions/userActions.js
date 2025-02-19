import api from '../utils/api';
import { toast } from 'react-toastify';

export const userLogin = (values) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const loginData = {
      username: values.username,
      email: values.username.includes('@') ? values.username : null,
      password: values.password
    };
    
    const response = await api.post('/api/users/login', loginData);
    const user = response.data;
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch({ type: 'LOADING', payload: false });
    
    // Redirect admin to admin dashboard
    if (user.isAdmin) {
      window.location.href = '/admin';
    }
    
    return user;
  } catch (error) {
    dispatch({ type: 'LOADING', payload: false });
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const userRegister = (values) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });
  try {
      const response = await api.post('/api/users/register', values);
      dispatch({ type: 'LOADING', payload: false });
      toast.success('Registration successful! Please login.');
      return response.data;
  } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: 'LOADING', payload: false });
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
  }
};
