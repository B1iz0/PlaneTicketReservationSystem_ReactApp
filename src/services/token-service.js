import API from 'api';
import {
  setJwtToken,
  removeJwtToken,
  setRefreshToken,
  removeRefreshToken,
} from 'reduxStore/tokenSlice';
import store from 'reduxStore/store';
import { usersEndPoint } from 'constants';

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

const getCompanyId = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])).companyId;
  } catch {
    return null;
  }
}

const setToken = async (token) => {
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

const refreshCurrentToken = async (refreshToken) => {
  await API.post(`${usersEndPoint}/refresh-token`, {
    refreshToken: refreshToken,
  })
    .then((response) => response.data)
    .then(async (data) => {
      await setToken(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getEmail, getRole, getId, getCompanyId, refreshCurrentToken, setToken, removeToken };
