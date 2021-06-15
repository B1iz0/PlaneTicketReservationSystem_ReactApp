import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import API from "api";
import { allFreeAirplanesEndPoint, allAirportsEndPoint, allFlightsEndPoint } from 'constants';

const useStyles = makeStyles((theme) => ({
    formField: {
        width: '100%',
    },
}));

const FlightCreateDialogContent = () => {
    const classes = useStyles();
    const token = useSelector((state) => state.token);

    const [freeAirplanes, setFreeAirplanes] = useState([]);
    const [airports, setAirports] = useState([]);

    const [flightNumber, setFlightNumber] = useState();
    const [airplaneId, setAirplaneId] = useState();
    const [departureAirportId, setDepartureAirportId] = useState();
    const [arrivalAirportId, setArrivalAirportId] = useState();
    const [departureDate, setDepartureDate] = useState();
    const [arrivalDate, setArrivalDate] = useState();

    const [airplane, setAirplane] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');

    useEffect(() => {
        const getFreeAirplanes = async () => {
            await API.get(`${allFreeAirplanesEndPoint}`)
                .then(response => response.data)
                .then(data => setFreeAirplanes(data))
                .catch();
        };
        const getAirports = async () => {
            await API.get(`${allAirportsEndPoint}`)
                .then(response => response.data)
                .then(data => setAirports(data))
                .catch();
        }

        getFreeAirplanes();
        getAirports();
    }, [])

    const handleCreate = () => {
        let departureDateWithoutTZ = departureDate;
        let hoursDiff =
            departureDateWithoutTZ.getHours() -
            departureDateWithoutTZ.getTimezoneOffset() / 60;
        departureDateWithoutTZ.setHours(hoursDiff);

        let arrivalDateWithoutTZ = arrivalDate;
        hoursDiff =
            arrivalDateWithoutTZ.getHours() -
            arrivalDateWithoutTZ.getTimezoneOffset() / 60;
        arrivalDateWithoutTZ.setHours(hoursDiff);

        console.log(departureDateWithoutTZ.toJSON());
        console.log(arrivalDateWithoutTZ.toJSON());

        const createFlight = async () => {
            await API.post(`${allFlightsEndPoint}`,
            {
                airplaneId: airplaneId,
                flightNumber: parseInt(flightNumber, 10),
                fromId: departureAirportId,
                toId: arrivalAirportId,
                departureDate: `${departureDateWithoutTZ.toJSON()}`,
                departureTime: `${departureDateWithoutTZ.toJSON()}`,
                arrivalDate: `${arrivalDateWithoutTZ.toJSON()}`,
                arrivalTime: `${arrivalDateWithoutTZ.toJSON()}`,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token.jwtToken,
                },
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                  }
            });
        };

        createFlight();
    };

    return(
          <>
            <DialogContent> 
                <form>
                    <Grid container spacing={1}>
                        <Grid item lg={12}>
                            <TextField 
                                className={classes.formField}
                                variant="outlined"
                                label="Flight number"
                                onChange={(e) => setFlightNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <FormControl className={classes.formField}>
                                <InputLabel>Airplane</InputLabel>
                                <Select
                                    value={airplane}
                                    onChange={(e) => setAirplane(e.target.value)}
                                >
                                    {freeAirplanes?.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.model}
                                            onClick={() => setAirplaneId(item.id)}
                                        >
                                            {item.model}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container spacing={1}>
                            <Grid item lg={6}>
                                <FormControl className={classes.formField}>
                                    <InputLabel>Departure airport</InputLabel>
                                    <Select
                                        value={departureAirport}
                                        onChange={(e) => setDepartureAirport(e.target.value)}
                                    >
                                        {airports?.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.name}
                                                onClick={() => setDepartureAirportId(item.id)}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <FormControl className={classes.formField}>
                                    <InputLabel>Arrival airport</InputLabel>
                                    <Select
                                        value={arrivalAirport}
                                        onChange={(e) => setArrivalAirport(e.target.value)}
                                    >
                                        {airports?.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.name}
                                                onClick={() => setArrivalAirportId(item.id)}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={1}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item lg={6}>
                                    <DateTimePicker 
                                        className={classes.formField}
                                        value={departureDate}
                                        onChange={value => setDepartureDate(value)}
                                        variant="inline"
                                        label="Departure date"
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <DateTimePicker 
                                        className={classes.formField}
                                        value={arrivalDate}
                                        onChange={value => setArrivalDate(value)}
                                        variant="inline"
                                        label="Arrival date"
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<KeyboardArrowRightIcon />}
                    onClick={handleCreate}
                >
                    Create
                </Button>
            </DialogActions>
        </>
    );
};

export default FlightCreateDialogContent;