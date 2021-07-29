import API from 'api';

import {
  hintsAmount,
  userHintsEndPoint,
  flightHintsEndPoint,
  companyHintsEndPoint,
  airplaneHintsEndPoint,
  airportHintsEndPoint,
} from 'constants/searchHintsUrl';

const getUserSearchHints = async (filter) => {
  return await API.get(`${userHintsEndPoint}`, {
    params: {
      email: filter.email,
      firstName: filter.firstName,
      lastName: filter.lastName,
      limit: hintsAmount,
    },
  }).then((response) => response.data);
};

const getFlightSearchHints = async (filter) => {
  return await API.get(`${flightHintsEndPoint}`, {
    params: {
      departureCity: filter.departureCity,
      arrivalCity: filter.arrivalCity,
      departureTime: null,
      arrivalTime: null,
    },
  }).then((response) => response.data);
};

const getCompanySearchHints = async (filter) => {
  return await API.get(`${companyHintsEndPoint}`, {
    params: {
      companyName: filter.companyName,
      countryName: filter.countryName,
    },
  }).then((response) => response.data);
};

const getAirplaneSearchHints = async (filter) => {
  return await API.get(`${airplaneHintsEndPoint}`, {
    params: {
      airplaneType: filter.airplaneType,
      companyName: filter.companyName,
      model: filter.model,
    },
  }).then((response) => response.data);
};

const getAirportSearchHints = async (filter) => {
  return await API.get(`${airportHintsEndPoint}`, {
    params: {
      companyName: filter.companyName,
      airportName: filter.airportName,
      cityName: filter.cityName,
      countryName: filter.countryName,
    },
  }).then((response) => response.data);
};

export {
  getUserSearchHints,
  getFlightSearchHints,
  getCompanySearchHints,
  getAirplaneSearchHints,
  getAirportSearchHints,
};
