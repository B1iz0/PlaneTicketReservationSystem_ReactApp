import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import {
  elementsOnAdminTable,
  usersEndPoint,
  usersCountEndPoint,
} from 'constants';

const postUser = async (user) => {
  return await API.post(`${usersEndPoint}/registration`, {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
  })
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getUserInfo = async () => {
  let token = store.getState().token;

  return await API.get(
    `${usersEndPoint}/myself`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFreeUsers = async () => {
  let token = store.getState().token;

  return await API.get(
    `${usersEndPoint}/free`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getManagers = async (companyId) => {
  let token = store.getState().token;

  return await API.get(
    `${usersEndPoint}/managers?companyId=${companyId}`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const putUser = async (user) => {
  let token = store.getState().token;
  await API.put(
    `${usersEndPoint}/${user.id}`,
    user,
    bearerAuthorization(token.jwtToken)
  );
};

const assignCompanyToUser = async (userId, companyId) => {
  let token = store.getState().token;

  return await API.post(
    `${usersEndPoint}/${userId}/assignCompany?companyId=${companyId}`,
    {},
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getFilteredUsers = async (
  offset,
  emailFilter,
  firstNameFilter,
  lastNameFilter
) => {
  let token = store.getState().token;
  let headers = bearerAuthorization(token.jwtToken).headers;

  return await API.get(`${usersEndPoint}`, {
    params: {
      offset: offset,
      limit: elementsOnAdminTable,
      email: emailFilter,
      firstName: firstNameFilter,
      lastName: lastNameFilter,
    },
    headers: headers,
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFilteredUsersCount = async (
  emailFilter,
  firstNameFilter,
  lastNameFilter
) => {
  let token = store.getState().token;
  let headers = bearerAuthorization(token.jwtToken).headers;

  return await API.get(`${usersCountEndPoint}`, {
    params: {
      email: emailFilter,
      firstName: firstNameFilter,
      lastName: lastNameFilter,
    },
    headers: headers,
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

export {
  postUser,
  getUserInfo,
  getFreeUsers,
  getManagers,
  putUser,
  assignCompanyToUser,
  getFilteredUsers,
  getFilteredUsersCount,
};
