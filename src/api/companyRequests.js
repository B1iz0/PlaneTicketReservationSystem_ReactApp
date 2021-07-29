import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import {
  elementsOnAdminTable,
  allCompaniesEndPoint,
  companiesEndPoint,
  allCompaniesCountEndPoint,
} from 'constants';

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

const getCompanies = async () => {
  return await API.get(`${companiesEndPoint}/all`)
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
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

export {
  getAllCompanies,
  getFilteredCompanies,
  getCompaniesCount,
  getCompanies,
  getCompany,
  postCompany,
  putCompany,
  deleteCompany,
};
