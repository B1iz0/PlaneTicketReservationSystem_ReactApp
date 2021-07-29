import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import {
  elementsOnAdminTable,
  allAirportsEndPoint,
  airportsEndPoint,
  airportsCountEndPoint,
} from 'constants';

const getAllAirports = async () => {
  return await API.get(`${allAirportsEndPoint}`)
    .then((response) => response.data)
    .then((airports) => airports)
    .catch((error) => console.log(error));
};

const getFilteredAirports = async (offset, filters) => {
  return await API.get(`${airportsEndPoint}`, {
    params: {
      companyName: filters.company,
      airportName: filters.airport,
      cityName: filters.city,
      countryName: filters.country,
      offset: offset,
      limit: elementsOnAdminTable,
    },
  })
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getFilteredAirportsCount = async (filters) => {
  return await API.get(`${airportsCountEndPoint}`, {
    params: {
      companyName: filters.company,
      airportName: filters.airport,
      cityName: filters.city,
      countryName: filters.country,
    },
  })
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const postAirport = async (airport) => {
  let token = store.getState().token;

  return await API.post(
    `${airportsEndPoint}`,
    {
      name: airport.name,
      cityId: airport.cityId,
      companyId: airport.companyId,
    },
    bearerAuthorization(token.jwtToken)
  )
    .then(response => [response.data, null])
    .catch(error => [null, error]);
};

const putAirport = async (airport) => {
  let token = store.getState().token;

  return await API.put(
    `${airportsEndPoint}/${airport.id}`,
    {
      name: airport.name,
      cityId: airport.cityId,
      companyId: airport.companyId,
    },
    bearerAuthorization(token.jwtToken)
  )
    .then(response => [response.data, null])
    .catch(error => [null, error]);
}

export {
  getAllAirports,
  getFilteredAirports,
  getFilteredAirportsCount,
  postAirport,
  putAirport,
};