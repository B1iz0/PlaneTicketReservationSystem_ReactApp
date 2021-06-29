import axios from 'axios';
import API from 'api';
import { bearerAuthorization } from 'api';
import {
  setJwtToken,
  removeJwtToken,
  setRefreshToken,
  removeRefreshToken,
} from 'reduxStore/tokenSlice';
import store from 'reduxStore/store';
import { allUsersEndPoint } from 'constants';

const getEmail = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])).email;
  } catch {
    return null;
  }
};

const getRole = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])).role;
  } catch {
    return 'User';
  }
};

const getId = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])).id;
  } catch {
    return null;
  }
}

const setToken = (token) => {
  localStorage.setItem('jwtToken', token.jwtToken);
  localStorage.setItem('refreshToken', token.refreshToken);
  store.dispatch(setJwtToken(token.jwtToken));
  store.dispatch(setRefreshToken(token.refreshToken));
};

const removeToken = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  store.dispatch(removeJwtToken());
  store.dispatch(removeRefreshToken());
}

const refreshCurrentToken = async (refreshToken, originalRequest) => {
  await API.post(`${allUsersEndPoint}/refresh-token`, {
    refreshToken: refreshToken,
  }, bearerAuthorization)
    .then((response) => response.data)
    .then((data) => {
      setToken(data);
      return axios(originalRequest)
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getEmail, getRole, getId, refreshCurrentToken, setToken, removeToken };
