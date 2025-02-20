import api from '../../utils/api';
import { GET_ALL_BOOKINGS, SET_LOADING } from '../types';

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await api.get('/api/bookings/getallbookings');
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
    const response = await api.post('/api/bookings/bookcar', reqObj);
    dispatch({ type: SET_LOADING, payload: false });
    return response.data;
  } catch (error) {
    console.error('Error booking car:', error);
    dispatch({ type: SET_LOADING, payload: false });
    throw error;
  }
};
