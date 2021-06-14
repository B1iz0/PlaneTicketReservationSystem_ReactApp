import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Filter from 'components/Filter';
import { refreshCurrentToken } from 'services/token-service';
import API from 'api';
import {
  allCompaniesEndPoint,
  allCompaniesCountEndPoint,
  elementsOnAdminTable,
} from 'constants';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  companiesGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const AdminCompaniesPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [companies, setCompanies] = useState([]);
  const [totalCompaniesNumber, setTotalCompaniesNumber] = useState(0);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(elementsOnAdminTable);
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [countryNameFilter, setCountryNameFilter] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Company name', width: 150 },
    { field: 'countryName', headerName: 'Country name', width: 150 },
  ];

  const rows = companies.map((value) => {
    return {
      id: value.id,
      name: value.name,
      countryName: value.country.name,
    };
  });

  useEffect(() => {
    const getCompanies = async () => {
      await API.get(`${allCompaniesEndPoint}`, {
        params: {
          offset: offset,
          limit: limit,
          companyName: companyNameFilter,
          countryName: countryNameFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setCompanies(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };
    const getCompaniesCount = async () => {
      await API.get(`${allCompaniesCountEndPoint}`, {
        params: {
          companyName: companyNameFilter,
          countryName: countryNameFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setTotalCompaniesNumber(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };

    getCompanies();
    getCompaniesCount();
  }, [offset, limit, companyNameFilter, countryNameFilter]);

  const onFilterConfirmed = (values) => {
    setCompanyNameFilter(values[0]);
    setCountryNameFilter(values[1]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * limit);
  };

  return (
    <>
      <div className={classes.tableHeader}>
        <Typography variant="h3">Companies</Typography>
        <Filter
          fields={['Company name', 'Country']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        onPageChange={(page) => onPageChange(page.page)}
        paginationMode="server"
        pageSize={limit}
        rowCount={totalCompaniesNumber}
        checkboxSelection={false}
        disableColumnMenu={true}
        className={classes.companiesGrid}
      />
    </>
  );
};
export default AdminCompaniesPage;
