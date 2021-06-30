import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import { allUsersEndPoint } from 'constants';

const getUserInfo = async () => {
  let dataResponse;
  let token = store.getState().token;

  await API.get(`${allUsersEndPoint}/myself`, bearerAuthorization(token.jwtToken))
    .then(response => response.data)
    .then(data => dataResponse = data)
    .catch(error => console.log(error));

  return dataResponse;
};

export { 
  getUserInfo,
}