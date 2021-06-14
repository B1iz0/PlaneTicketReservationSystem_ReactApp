import API from 'api';
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

const setToken = (token) => {
  localStorage.setItem('jwtToken', token.jwtToken);
  localStorage.setItem('refreshToken', token.refreshToken);
  store.dispatch(setJwtToken(token.jwtToken));
  store.dispatch(setRefreshToken(token.refreshToken));
};

const refreshCurrentToken = async (refreshToken) => {
  await API.post(`${allUsersEndPoint}/refresh-token`, {
    refreshToken: refreshToken,
  })
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem('jwtToken', data.jwtToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      store.dispatch(setJwtToken(data.jwtToken));
      store.dispatch(setRefreshToken(data.refreshToken));
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      store.dispatch(removeJwtToken());
      store.dispatch(removeRefreshToken());
    });
};

export { getEmail, getRole, refreshCurrentToken, setToken };
