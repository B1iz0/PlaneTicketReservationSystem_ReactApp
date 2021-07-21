import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from 'components/shared/Table';
import Filter from 'components/Filter';
import { elementsOnAdminTable } from 'constants';
import { getFilteredAirports, getFilteredAirpotCount } from 'api/apiRequests';

const useStyles = makeStyles((theme) => ({
  airportsTable: {
    minHeight: 400,
  },
  airportsFilter: {
    marginBottom: theme.spacing(2),
  },
}));

const columns = [
  { field: 'name', headerName: 'Airport name', width: 200 },
  { field: 'city', headerName: 'City', width: 200 },
  { field: 'country', headerName: 'Country', width: 200 },
];

const CompanyAirportsTable = ({ companyName }) => {
  const classes = useStyles();

  const [offset, setOffset] = useState(0);

  const [airportFilter, setAirportFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  const [airports, setAirports] = useState([]);
  const [airportsCount, setAirportsCount] = useState(0);

  const rows = airports.map((value) => ({
    id: value.id,
    name: value.name,
    city: value.city.name,
    country: value.city.country.name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (companyName) {
        const filters = {
          company: companyName,
          airport: airportFilter,
          city: cityFilter,
          country: countryFilter,
        };
        const [airportsResponse, airportsError] = await getFilteredAirports(
          offset,
          filters
        );
        if (airportsResponse) setAirports(airportsResponse);
        if (airportsError) {
          // Handle error.
        }
        const [airportsCount, airportsCountError] =
          await getFilteredAirpotCount(filters);
        if (airportsCount) setAirportsCount(airportsCount);
        if (airportsCountError) {
          // Handle error.
        }
      }
    };

    fetchData();
  }, [companyName, offset, airportFilter, cityFilter, countryFilter]);

  const onFilterConfirmed = (values) => {
    setAirportFilter(values[0]);
    setCityFilter(values[1]);
    setCountryFilter(values[2]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * elementsOnAdminTable);
  };

  const handleAddClick = () => {};

  return (
    <>
      <div className={classes.airportsFilter}>
        <Filter
          fields={['Airport name', 'City', 'Country']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <Table
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={airportsCount}
        onAddClick={handleAddClick}
      />
    </>
  );
};

export default CompanyAirportsTable;
