import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import Table from 'components/shared/Table';
import Filter from 'components/Filter';
import AirportCreateDialog from 'components/shared/Dialogs/AirportCreateDialog';
import AirportEditDialog from 'components/shared/Dialogs/AirportEditDialog';
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


const CompanyAirportsTable = ({ company }) => {
  const classes = useStyles();
  
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  
  const [airportFilter, setAirportFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  
  const [airports, setAirports] = useState([]);
  const [airportsCount, setAirportsCount] = useState(0);
  
  const [isAirportCreateDialogOpened, setIsAirportCreateDialogOpened] = useState(false);
  
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isAirportEditDialogOpened, setIsAirportEditDialogOpened] = useState(false);
  
  const columns = [
    { field: 'name', headerName: 'Airport name', width: 200 },
    { field: 'cityName', headerName: 'City', width: 200 },
    { field: 'country', headerName: 'Country', width: 200 },
    {
      field: 'actions', 
      headerName: 'Actions', 
      width: 200,
      renderCell: (row) => {
        return (
          <>
            <Tooltip title='Edit'>
              <IconButton 
                color='primary'
                onClick={() => handleEditClick(row.row)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ];

  const rows = airports.map((value) => ({
    id: value.id,
    name: value.name,
    cityName: value.city.name,
    country: value.city.country.name,
    city: value.city,
    company: value.company,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (company?.name) {
        const filters = {
          company: company.name,
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
        const [airportsCountResponse, airportsCountError] =
          await getFilteredAirpotCount(filters);
        if (airportsCountError) {
          // Handle error.
        } else {
          setAirportsCount(airportsCountResponse);
        }
      }
    };

    fetchData();
  }, [company, offset, airportFilter, cityFilter, countryFilter, isAirportCreateDialogOpened, isAirportEditDialogOpened]);

  const onFilterConfirmed = (values) => {
    setAirportFilter(values[0]);
    setCityFilter(values[1]);
    setCountryFilter(values[2]);
    setOffset(0);
    setPage(0);
  };

  const onPageChange = (page) => {
    setPage(page);
    setOffset(page * elementsOnAdminTable);
  };

  const handleEditClick = (airport) => {
    setSelectedAirport(airport);
    setIsAirportEditDialogOpened(true);
  };

  return (
    <>
      <div className={classes.airportsFilter}>
        <Filter
          fields={['Airport name', 'City', 'Country']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <AirportCreateDialog 
        company={company}
        isOpened={isAirportCreateDialogOpened}
        closeDialog={() => setIsAirportCreateDialogOpened(false)}
      />
      <AirportEditDialog 
        airport={selectedAirport}
        company={company}
        isOpened={isAirportEditDialogOpened}
        closeDialog={() => setIsAirportEditDialogOpened(false)}
      />
      <Table
        page={page}
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={airportsCount}
        onAddClick={() => setIsAirportCreateDialogOpened(true)}
      />
    </>
  );
};

export default CompanyAirportsTable;
