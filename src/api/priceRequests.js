import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import { pricesEndPoint } from 'constants';

const getAirplanePlacePrices = async (airplaneId) => {
  return await API.get(`${pricesEndPoint}/${airplaneId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const putAirplanePrices = async (prices) => {
  let token = store.getState().token;

  await API.put(
    `${pricesEndPoint}`,
    prices,
    bearerAuthorization(token.jwtToken)
  ).catch((error) => console.log(error));
};

export { getAirplanePlacePrices, putAirplanePrices };
