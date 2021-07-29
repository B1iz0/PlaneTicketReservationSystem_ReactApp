import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import {
  placeTypesEndPoint,
  placesEndPoint,
} from 'constants';

const getPlaceTypes = async () => {
  return await API.get(`${placeTypesEndPoint}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const postPlacesList = async (requestModel) => {
  let token = store.getState().token;

  await API.post(
    `${placesEndPoint}`,
    requestModel,
    bearerAuthorization(token.jwtToken)
  ).catch((error) => console.log(error));
};

const blockPlace = async (placeId, userId) => {
  await API.put(
    `${placesEndPoint}/${placeId}/block?blockingByUserId=${
      userId ? userId : ''
    }`
  );
};

const unblockPlace = async (placeId) => {
  await API.put(`${placesEndPoint}/${placeId}/unblock`);
};

export {
  getPlaceTypes,
  postPlacesList,
  blockPlace,
  unblockPlace,
};