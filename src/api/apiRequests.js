import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import { 
  elementsOnAdminTable,
  allAirplanesEndPoint,
  freeAirplanesEndPoint,
  allAirplanesCountEndPoint,
  allAirplaneTypesEndPoint,
  allCompaniesEndPoint,
  allCompaniesCountEndPoint,
  companiesEndPoint,
  flightsEndPoint,
  flightsCountEndPoint,
  allAirportsEndPoint,
  usersEndPoint,
  usersCountEndPoint,
  placeTypesEndPoint,
  placesEndPoint,
  pricesEndPoint,
} from 'constants';

const getUserInfo = async () => {
  let token = store.getState().token;

  return await API.get(`${usersEndPoint}/myself`, bearerAuthorization(token.jwtToken))
    .then(response => response.data)
    .then(data => data)
    .catch(error => console.log(error));
};

const getAirplanes = async (offset, airplaneTypeFilter, companyFilter, modelFilter) => {
  return await API.get(`${allAirplanesEndPoint}`, {
    params: {
      offset: offset,
      limit: elementsOnAdminTable,
      airplaneType: airplaneTypeFilter,
      company: companyFilter,
      model: modelFilter,
    },
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFreeAirplanes = async () => {
  return await API.get(`${freeAirplanesEndPoint}`)
    .then((response) => response.data)
    .then((airplanes) => airplanes)
    .catch((error) => console.log(error));
};

const getAirplanesCount = async (airplaneTypeFilter, companyFilter, modelFilter) => {
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

const getAirplaneTypes = async () => {
  return await API.get(`${allAirplaneTypesEndPoint}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getAllCompanies = async () => {
  return await API.get(`${allCompaniesEndPoint}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFilteredCompanies = async (
  offset,
  companyNameFilter,
  countryNameFilter
) => {
  return await API.get(`${companiesEndPoint}`, {
    params: {
      offset: offset,
      limit: elementsOnAdminTable,
      companyName: companyNameFilter,
      countryName: countryNameFilter,
    }
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getCompaniesCount = async (companyNameFilter, countryNameFilter) => {
  return await API.get(`${allCompaniesCountEndPoint}`, {
    params: {
      companyName: companyNameFilter,
      countryName: countryNameFilter,
    }
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
  columns
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
    }, 
    bearerAuthorization(token.jwtToken))
      .then(response => response.data)
      .catch((error) => console.log(error));
};

const getFilteredFlights = async (offset, limit, departureCityFilter, arrivalCityFilter) => {
  return await API.get(`${flightsEndPoint}`, {
    params: {
      offset: offset,
      limit: limit,
      departureCity: departureCityFilter,
      arrivalCity: arrivalCityFilter,
    }
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFlightsCount = async (departureCityFilter, arrivalCityFilter) => {
  return await API.get(`${flightsCountEndPoint}`, {
    params: {
      departureCity: departureCityFilter,
      arrivalCity: arrivalCityFilter,
    }
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFlight = async (flightUrl) => {
  return await API.get(`${flightUrl}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const postFlight = async (
  airplaneId,
  flightNumber,
  departureAirportId,
  arrivalAirportId,
  departureTimeWithoutTZ,
  arrivalTimeWithoutTZ
) => {
  let token = store.getState().token;

  await API.post(
    `${flightsEndPoint}`,
    {
        airplaneId: airplaneId,
        flightNumber: flightNumber,
        fromId: departureAirportId,
        toId: arrivalAirportId,
        departureTime: `${departureTimeWithoutTZ.toJSON()}`,
        arrivalTime: `${arrivalTimeWithoutTZ.toJSON()}`,
    },
    bearerAuthorization(token.jwtToken))
      .catch((error) => console.log(error));
} 

const putFlight = async (
  flightId,
  airplaneId,
  flightNumber,
  departureAirportId,
  arrivalAirportId,
  departureTimeWithoutTZ,
  arrivalTimeWithoutTZ
) => {
  let token = store.getState().token;

  await API.put(
    `${flightsEndPoint}/${flightId}`,
    {
      airplaneId: airplaneId,
      flightNumber: flightNumber,
      fromId: departureAirportId,
      toId: arrivalAirportId,
      departureTime: `${departureTimeWithoutTZ.toJSON()}`,
      arrivalTime: `${arrivalTimeWithoutTZ.toJSON()}`,
    },
    bearerAuthorization(token.jwtToken))
      .catch((error) => console.log(error));
}

const getAllAirports = async () => {
  return await API.get(`${allAirportsEndPoint}`)
    .then((response) => response.data)
    .then((airports) => airports)
    .catch((error) => console.log(error));
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

const getPlaceTypes = async () => {
  return await API.get(`${placeTypesEndPoint}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

const postPlacesList = async (requestModel) => {
  let token = store.getState().token;

  await API.post(
      `${placesEndPoint}`, 
      requestModel,
      bearerAuthorization(token.jwtToken)
    )
      .catch(error => console.log(error));
};

const getAirplanePlacePrices = async (airplaneId) => {
  return await API.get(`${pricesEndPoint}/${airplaneId}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const putAirplanePrices = async (prices) => {
  let token = store.getState().token;

  await API.put(
    `${pricesEndPoint}`,
    prices,
    bearerAuthorization(token.jwtToken)
  )
    .catch(error => console.log(error));
};

export { 
  getUserInfo,
  getAirplanes,
  getFreeAirplanes,
  getAirplanesCount,
  getAirplaneTypes,
  getAllCompanies,
  getFilteredCompanies,
  getCompaniesCount,
  addAirplane,
  getFilteredFlights,
  getFlightsCount,
  getFlight,
  postFlight,
  putFlight,
  getAllAirports,
  getFilteredUsers,
  getFilteredUsersCount,
  getPlaceTypes,
  postPlacesList,
  getAirplanePlacePrices,
  putAirplanePrices
}