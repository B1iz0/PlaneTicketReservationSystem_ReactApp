import axios from 'axios';
import store from 'reduxStore/store';

import { reservationSystemURL } from 'constants';

const instanse = axios.create({
  baseURL: reservationSystemURL,
  responseType: 'json',
});

instanse.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

instanse.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

const options = {
  headers: {
    'Authorization': `Bearer ${store.getState().token.jwtToken}`,
  }
};

export default instanse;