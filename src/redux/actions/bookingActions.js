import axios from 'axios';
import { GET_ALL_BOOKINGS, SET_LOADING } from '../types';

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await axios.get('/api/bookings/getallbookings');
    // Ensure response data is an array
    const bookingsData = Array.isArray(response.data) ? response.data : [];
    dispatch({ type: GET_ALL_BOOKINGS, payload: bookingsData });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await axios.post('/api/bookings/bookcar', reqObj);
    dispatch({ type: SET_LOADING, payload: false });
    return response.data;
  } catch (error) {
    console.error('Error booking car:', error);
    dispatch({ type: SET_LOADING, payload: false });
    throw error;
  }
};