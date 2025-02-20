import api, { setAuthToken } from '../../utils/api';
import { toast } from 'react-toastify';

export const userLogin = (values) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const loginData = {
      [values.username.includes('@') ? 'email' : 'username']: values.username,
      password: values.password
    };
    
    const response = await api.post('/api/users/login', loginData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }
    
    const { user, token } = response.data;
    
    // Save user and token to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    
    dispatch({ type: 'LOADING', payload: false });
    
    // Return complete user data including isAdmin flag
    return {
      ...user,
      isAdmin: user.role === 'admin'
    };
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

export const userLogout = () => async dispatch => {
  try {
    // Clear all state immediately
    dispatch({ type: 'USER_LOGOUT' });
    
    // Clear auth token
    setAuthToken(null);
    
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Force page reload to clear all state
    window.location.href = '/login';
    window.location.reload();
  } catch (error) {
    console.error('Logout error:', error);
    // Force logout even if error occurs
    localStorage.clear();
    window.location.href = '/login';
    window.location.reload();
  }
};
