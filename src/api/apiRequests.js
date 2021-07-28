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
  airportsEndPoint,
  airportsCountEndPoint,
  usersEndPoint,
  usersCountEndPoint,
  placeTypesEndPoint,
  placesEndPoint,
  pricesEndPoint,
  bookingsEndPoint,
  countriesEndPoint,
  allCtitesEndPoint,
} from 'constants';

const postUser = async (user) => {
  return await API.post(
    `${usersEndPoint}/registration`,
    {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    }
  )
    .then(response => [response.data, null])
    .catch(error => [null, error]);
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
    },
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

const getFilteredFlights = async (
  offset,
  limit,
  departureCityFilter,
  arrivalCityFilter
) => {
  return await API.get(`${flightsEndPoint}`, {
    params: {
      offset: offset,
      limit: limit,
      departureCity: departureCityFilter,
      arrivalCity: arrivalCityFilter,
    },
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
    },
  })
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const getFlight = async (flightId) => {
  return await API.get(`${flightsEndPoint}/${flightId}`)
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
  arrivalTimeWithoutTZ,
  freeBaggageLimit,
  overweightPrice
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
      freeBaggageLimitInKilograms: parseFloat(freeBaggageLimit),
      overweightPrice: parseFloat(overweightPrice),
    },
    bearerAuthorization(token.jwtToken)
  ).catch((error) => console.log(error));
};

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
    bearerAuthorization(token.jwtToken)
  ).catch((error) => console.log(error));
};

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

const getFilteredAirpotCount = async (filters) => {
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

const postBooking = async (booking) => {
  let token = store.getState().token;

  return await API.post(
    `${bookingsEndPoint}`,
    booking,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
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

const getCompanies = async () => {
  return await API.get(`${companiesEndPoint}/all`)
    .then(response => [response.data, null])
    .catch(error => [null, error]);
};

const getCompany = async (companyId) => {
  let token = store.getState().token;

  return await API.get(
    `${companiesEndPoint}/${companyId}`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const postCompany = async (company) => {
  let token = store.getState().token;

  return await API.post(
    `${companiesEndPoint}`,
    {
      name: company.name,
      countryId: company.countryId,
    },
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const putCompany = async (company) => {
  let token = store.getState().token;

  return await API.put(
    `${companiesEndPoint}/${company.id}`,
    {
      name: company.name,
      countryId: company.countryId,
    },
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const deleteCompany = async (companyId) => {
  let token = store.getState().token;

  return await API.delete(
    `${companiesEndPoint}/${companyId}`,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getCountries = async () => {
  return await API.get(`${countriesEndPoint}`)
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getCities = async () => {
  return await API.get(`${allCtitesEndPoint}`)
    .then(response => [response.data, null])
    .catch(error => [null, error]);
}

export {
  postUser,
  getUserInfo,
  getFreeUsers,
  getManagers,
  putUser,
  assignCompanyToUser,
  getAirplanes,
  deleteAirplane,
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
  getFilteredAirports,
  getFilteredAirpotCount,
  postAirport,
  putAirport,
  getFilteredUsers,
  getFilteredUsersCount,
  getPlaceTypes,
  postPlacesList,
  getAirplanePlacePrices,
  putAirplanePrices,
  postBooking,
  blockPlace,
  unblockPlace,
  getCompanies,
  getCompany,
  postCompany,
  putCompany,
  deleteCompany,
  getCountries,
  getCities,
};
