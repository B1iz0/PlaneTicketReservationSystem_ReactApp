import axios from 'axios';
import store from 'reduxStore/store';

import { refreshCurrentToken, removeToken } from 'services/token-service';
import { allUsersEndPoint } from 'constants';
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

  if (originalRequest.url === `${allUsersEndPoint}/refresh-token`) {
    removeToken();
    window.location.href = '/SignIn';
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return refreshCurrentToken(store.getState().token.refreshToken);
  }

  return Promise.reject(error);
});

const bearerAuthorization = {
  headers: {
    'Authorization': `Bearer ${store.getState().token.jwtToken}`,
  }
};

export { bearerAuthorization };

export default instanse;