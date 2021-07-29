import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import {
  elementsOnAdminTable,
  allAirplaneTypesEndPoint,
  allAirplanesEndPoint,
  freeAirplanesEndPoint,
  allAirplanesCountEndPoint,
} from 'constants';

const getAirplaneTypes = async () => {
  return await API.get(`${allAirplaneTypesEndPoint}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getAirplanes = async (
  offset,
  airplaneTypeFilter,
  companyFilter,
  modelFilter
) => {
  return await API.get(`${allAirplanesEndPoint}`, {
    params: {
      offset: offset,
      limit: elementsOnAdminTable,
      airplaneType: airplaneTypeFilter,
      companyName: companyFilter,
      model: modelFilter,
    },
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const addAirplane = async (
  airplaneTypeId,
  companyId,
  model,
  registrationNumber,
  rows,
  columns,
  baggageCapacity
) => {
  let token = store.getState().token;

  return await API.post(
    `${allAirplanesEndPoint}`,
    {
      airplaneTypeId: airplaneTypeId,
      companyId: companyId,
      model: model,
      registrationNumber: parseInt(registrationNumber, 10),
      rows: parseInt(rows, 10),
      columns: parseInt(columns, 10),
      baggageCapacityInKilograms: parseFloat(baggageCapacity, 10),
    },
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const deleteAirplane = async (airplaneId) => {
  let token = store.getState().token;

  return await API.delete(
    `${allAirplanesEndPoint}/${airplaneId}`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response, null])
    .catch((error) => [null, error]);
};

const getFreeAirplanes = async () => {
  return await API.get(`${freeAirplanesEndPoint}`)
    .then((response) => response.data)
    .then((airplanes) => airplanes)
    .catch((error) => console.log(error));
};

const getAirplanesCount = async (
  airplaneTypeFilter,
  companyFilter,
  modelFilter
) => {
  return await API.get(`${allAirplanesCountEndPoint}`, {
    params: {
      airplaneType: airplaneTypeFilter,
      company: companyFilter,
      model: modelFilter,
    },
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

export {
  getAirplaneTypes,
  getAirplanes,
  addAirplane,
  deleteAirplane,
  getFreeAirplanes,
  getAirplanesCount,
};
