import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IconButton } from '@material-ui/core';

import CustomDialog from 'components/shared/CustomDialog';
import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import { getFilteredFlights, getFlightsCount } from 'api/apiRequests';
import {
  elementsOnAdminTable,
} from 'constants';

import FlightInfoDialogContent from './FlightInfoDialogContent';
import FlightEditDialogContent from './FlightEditDialogContent';
import FlightCreateDialogContent from './FlightCreateDialogContent';

const useStyles = makeStyles((theme) => ({
  flightsGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const AdminFlightsPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [flights, setFlights] = useState([]);
  const [totalFlightsNumber, setTotalFlightsNumber] = useState(0);

  const [offset, setOffset] = useState(0);
  const [departureCityFilter, setDepartureCityFilter] = useState('');
  const [arrivalCityFilter, setArrivalCityFilter] = useState('');

  const [flightForEditing, setFlightForEditing] = useState();
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);

  const [flightIdEdit, setFlightIdInfo] = useState();
  const [isMoreInfoDialogOpened, setIsMoreInfoDialogOpened] = useState(false);

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'flightNumber', headerName: 'Flight number', width: 150 },
    { field: 'airplaneModel', headerName: 'Airplane model', width: 200 },
    {
      field: 'airplaneRegistartionNumber',
      headerName: 'Airplane registration number',
      width: 300,
    },
    {
      field: 'fromAirportName',
      headerName: 'Departure airport',
      width: 200,
    },
    { field: 'toAirportName', headerName: 'Arrival airport', width: 150 },
    { field: 'departureTime', headerName: 'Departure time', width: 200 },
    { field: 'arrivalTime', headerName: 'Arrival time', width: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: (row) => {
        return (
          <IconButton
            onClick={() => openEditInfoDialog(row.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: 'info',
      headerName: 'More info',
      renderCell: (row) => {
        return (
          <IconButton
            color="primary"
            onClick={() => openMoreInfoDialog(row.id)}
          >
            <InfoOutlinedIcon className={classes.moreInfoIcon} />
          </IconButton>
        );
      },
    },
  ];

  const rows = flights.map((value) => {
    return {
      id: value.id,
      flightNumber: value.flightNumber,
      airplaneId: value.airplane.id,
      airplaneModel: value.airplane.model,
      airplaneRegistartionNumber: value.airplane.registrationNumber,
      fromAirportName: value.from.name,
      fromAirportId: value.from.id,
      toAirportName: value.to.name,
      toAirportId: value.to.id,
      departureTime: value.departureTime,
      arrivalTime: value.arrivalTime,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getFilteredFlights(offset, elementsOnAdminTable, departureCityFilter, arrivalCityFilter);
      const flightsCount = await getFlightsCount(departureCityFilter, arrivalCityFilter);
    
      setFlights(flights);
      setTotalFlightsNumber(flightsCount);
    }

    fetchData();
  }, [
    token,
    offset,
    departureCityFilter,
    arrivalCityFilter,
    isEditDialogOpened,
    isCreateDialogOpened
  ]);

  const onFilterConfirmed = (values) => {
    setDepartureCityFilter(values[0]);
    setArrivalCityFilter(values[1]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * elementsOnAdminTable);
  };

  const openMoreInfoDialog = (id) => {
    setFlightIdInfo(id);
    setIsMoreInfoDialogOpened(true);
  };

  const openEditInfoDialog = (row) => {
    setFlightForEditing(row);
    setIsEditDialogOpened(true);
  };

  const closeCreateFlightDialog = () => {
    setIsCreateDialogOpened(false);
  }

  return (
    <>
      <CustomDialog 
        title="Create flight"
        isOpened={isCreateDialogOpened}
        DialogContent={
          <FlightCreateDialogContent closeDialog={closeCreateFlightDialog}/>
        }
        closeDialog={closeCreateFlightDialog}
      />
      <CustomDialog
        title="More info"
        isOpened={isMoreInfoDialogOpened}
        DialogContent={
          <FlightInfoDialogContent
          flightId={flightIdEdit}
          />
        }
        closeDialog={() => setIsMoreInfoDialogOpened(false)}
      />
      <CustomDialog
        title="Edit"
        isOpened={isEditDialogOpened}
        DialogContent={
          <FlightEditDialogContent 
            flightForEditing={flightForEditing} 
            closeDialog={() => setIsEditDialogOpened(false)}
          />
        }
        closeDialog={() => setIsEditDialogOpened(false)}
      />
      <div className={classes.tableHeader}>
        <Typography variant="h3">Flights</Typography>
        <Filter
          fields={['Departure city', 'Arrival city']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <Table
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={totalFlightsNumber}
        onAddClick={() => setIsCreateDialogOpened(true)}
      />
    </>
  );
};

export default AdminFlightsPage;
