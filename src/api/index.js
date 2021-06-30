import axios from 'axios';
import store from 'reduxStore/store';

import { refreshCurrentToken, removeToken } from 'services/token-service';
import { usersEndPoint } from 'constants';
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
  const originalRequest = error.config;

  if (originalRequest.url === `${usersEndPoint}/refresh-token`) {
    removeToken();
    window.location.href = '/SignIn';
  };

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return refreshCurrentToken(store.getState().token.refreshToken)
    .then(() => {
      originalRequest.headers.Authorization = `Bearer ${store.getState().token.jwtToken}`;
      return axios(originalRequest);
    });
  };

  return Promise.reject(error);
});

const bearerAuthorization = (jwtToken) => {
  return {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    }
  }
};

export { bearerAuthorization };

export default instanse;