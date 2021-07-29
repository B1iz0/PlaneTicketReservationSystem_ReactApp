import API from 'api';

import { countriesEndPoint, allCtitesEndPoint } from 'constants';

const getCountries = async () => {
  return await API.get(`${countriesEndPoint}`)
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

const getCities = async () => {
  return await API.get(`${allCtitesEndPoint}`)
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

export { getCountries, getCities };
