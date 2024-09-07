import { Action } from '../Contexts/context';
import axios from 'axios';

export const setupAxiosInterceptors = (dispatch: React.Dispatch<Action>) => {
  axios.interceptors.request.use((config) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    return config;
  });
  // Unneccesary repetition. Not sure how finally block works?
  axios.interceptors.response.use(
    (response) => {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
      return response;
    },
    (error) => {
      if (error.response) {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      }
      return Promise.reject(error);
    }
  );
};
