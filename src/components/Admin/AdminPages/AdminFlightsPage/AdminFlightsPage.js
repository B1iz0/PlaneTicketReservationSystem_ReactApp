import React, { useState, useEffect } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import EditDialog from "components/shared/EditDialog";
import Filter from "components/Filter";
import { refreshCurrentToken } from "services/token-service";
import API from "api";
import {
    allFlightsEndPoint,
    allFlightsCountEndPoint,
    elementsOnAdminTable
} from "constants";

import FlightEditDialogContent from './FlightEditDialogContent';

const useStyles = makeStyles((theme) => ({
    flightsGrid: {
      height: '500px',
      width: '100%',
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }));

const AdminFlightsPage = () => {
    const classes = useStyles();
    const token = useSelector((state) => state.token);

    const [ flights, setFlights ] = useState([]);
    const [ totalFlightsNumber, setTotalFlightsNumber ] = useState(0);

    const [ offset, setOffset ] = useState(0);
    const [ limit, setLimit ] = useState(elementsOnAdminTable);
    const [ departureCityFilter, setDepartureCityFilter ] = useState('');
    const [ arrivalCityFilter, setArrivalCityFilter ] = useState('');

    const [ flightIdEdit, setFlightIdEdit ] = useState();
    const [ isEditDialogOpened, setIsEditDialogOpened ] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'flightNumber', headerName: 'Flight number', width: 150 },
        { field: 'airplaneModel', headerName: 'Airplane model', width: 200 },
        { field: 'airplaneRegistartionNumber', headerName: 'Airplane registration number', width: 300 },
        { field: 'fromCityName', headerName: 'Departure city', width: 200 },
        { field: 'toCityName', headerName: 'Arrival city', width: 150 },
        { field: 'departureDate', headerName: 'Departure date', width: 200 },
        { field: 'arrivalDate', headerName: 'Arrival date', width: 200 },
    ];

    const rows = flights.map((value) => {
        return {
            id: value.id,
            flightNumber: value.flightNumber,
            airplaneModel: value.airplane.model,
            airplaneRegistartionNumber: value.airplane.registrationNumber,
            fromCityName: value.from.city.name,
            toCityName: value.to.city.name,
            departureDate: value.departureDate,
            arrivalDate: value.arrivalDate,
        }
    })

    useEffect(() => {
        const getFlights = async () => {
            await API.get(`${allFlightsEndPoint}`, {
              params: {
                offset: offset,
                limit: limit,
                departureCity: departureCityFilter,
                arrivalCity: arrivalCityFilter,
              },
              headers: {
                Authorization: "Bearer " + token.jwtToken,
              },
            })
              .then((response) => response.data)
              .then((data) => setFlights(data))
              .catch((error) => {
                refreshCurrentToken(token.refreshToken);
                if (error.response) {
                  console.log(error.response.data);
                };
            });
        };
        const getFlightsCount = async () => {
          await API.get(`${allFlightsCountEndPoint}`, {
            params: {
              departureCity: departureCityFilter,
              arrivalCity: arrivalCityFilter,
            },
            headers: {
              Authorization: "Bearer " + token.jwtToken,
            },
          })
            .then((response) => response.data)
            .then((data) => setTotalFlightsNumber(data))
            .catch((error) => {
              refreshCurrentToken(token.refreshToken);
              if (error.response) {
                console.log(error.response.data);
              };
          });
        };
  
        getFlights();
        getFlightsCount();
    }, [offset, limit, departureCityFilter, arrivalCityFilter]);

    const onFilterConfirmed = (values) => {
      setDepartureCityFilter(values[0]);
      setArrivalCityFilter(values[1]);
      setOffset(0);
    };
    
    const onPageChange = (page) => {
      setOffset(page * limit);
    };

    const onRowDoubleClick = (event) => {
      setFlightIdEdit(event?.row?.id);
      setIsEditDialogOpened(true);
    }

    const closeEditDialog = () => {
      setIsEditDialogOpened(false);
    }
    
    return(
        <div>
            <EditDialog isOpened={isEditDialogOpened} EditDialogContent={FlightEditDialogContent} elementUrl={`${allFlightsEndPoint}/${flightIdEdit}`} closeEditDialog={closeEditDialog}/>
            <div className={classes.tableHeader}>
                <Typography variant="h3">Flights</Typography>
                <Filter 
                fields={['Departure city', 'Arrival city']}
                disableOptions={true}
                onFilterConfirmed={onFilterConfirmed}/>
            </div>
            <DataGrid 
                onRowDoubleClick={(event) => onRowDoubleClick(event)}
                columns={columns} 
                rows={rows} 
                onPageChange={(page) => onPageChange(page.page)} 
                paginationMode='server' 
                pageSize={limit} 
                rowCount={totalFlightsNumber} 
                checkboxSelection={false} 
                disableColumnMenu={true} 
                className={classes.flightsGrid}/>
        </div>
    );
};

export default AdminFlightsPage;