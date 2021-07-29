import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import { flightsEndPoint, flightsCountEndPoint } from 'constants';

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

export {
  getFilteredFlights,
  getFlightsCount,
  getFlight,
  postFlight,
  putFlight,
};
