import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { getAllAirports } from 'api/airportRequests';
import { putFlight } from 'api/flightRequests';
import { getFreeAirplanes } from 'api/airplaneRequests';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(3),
  },
}));

const FlightEditDialogContent = ({ flightForEditing, closeDialog }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [freeAirplanes, setFreeAirplanes] = useState([]);
  const [airports, setAirports] = useState([]);

  const [flightNumber, setFlightNumber] = useState(
    flightForEditing?.flightNumber
  );
  const [airplaneId, setAirplaneId] = useState(flightForEditing?.airplaneId);
  const [fromAirportId, setFromAirportId] = useState(
    flightForEditing?.fromAirportId
  );
  const [toAirportId, setToAirportId] = useState(flightForEditing?.toAirportId);
  const [departureDate, setDepartureDate] = useState(
    new Date(flightForEditing?.departureTime)
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date(flightForEditing?.arrivalTime)
  );

  const [airplane, setAirplane] = useState(flightForEditing?.airplaneModel);
  const [departureAirport, setDepartureAirport] = useState(
    flightForEditing?.fromAirportName
  );
  const [arrivalAirport, setArrivalAirport] = useState(
    flightForEditing?.toAirportName
  );

  useEffect(() => {
    const fetchData = async () => {
      const freeAirplanes = await getFreeAirplanes();
      const allAirports = await getAllAirports();

      setFreeAirplanes(freeAirplanes);
      setAirports(allAirports);
    };

    fetchData();
  }, [token]);

  const onResetClick = () => {
    setFlightNumber(flightForEditing?.flightNumber);
    setAirplaneId(flightForEditing?.airplaneId);
    setFromAirportId(flightForEditing?.fromAirportId);
    setToAirportId(flightForEditing?.toAirportId);
    setArrivalDate(new Date(flightForEditing?.arrivalTime));
    setDepartureDate(new Date(flightForEditing?.departureTime));
    setAirplane(flightForEditing?.airplaneModel);
    setDepartureAirport(flightForEditing?.fromAirportName);
    setArrivalAirport(flightForEditing?.toAirportName);
  };

  const saveFlight = async () => {
    let departureTimeWithoutTZ = departureDate;
    let hoursDiff =
      departureTimeWithoutTZ.getHours() -
      departureTimeWithoutTZ.getTimezoneOffset() / 60;
    departureTimeWithoutTZ.setHours(hoursDiff);

    let arrivalTimeWithoutTZ = arrivalDate;
    hoursDiff =
      arrivalTimeWithoutTZ.getHours() -
      arrivalTimeWithoutTZ.getTimezoneOffset() / 60;
    arrivalTimeWithoutTZ.setHours(hoursDiff);

    await putFlight(
      flightForEditing?.id,
      airplaneId,
      flightNumber,
      fromAirportId,
      toAirportId,
      departureTimeWithoutTZ,
      arrivalTimeWithoutTZ
    );
  };

  const onSaveClick = async () => {
    await saveFlight();
    closeDialog();
  };

  const onAirplaneChange = (event, child) => {
    setAirplane(event.target.value);
    setAirplaneId(child.props.id);
  };

  const onDepartureAirportChange = (event, child) => {
    setDepartureAirport(event.target.value);
    setFromAirportId(child.props.id);
  };

  const onArrivalAirportChange = (event, child) => {
    setArrivalAirport(event.target.value);
    setToAirportId(child.props.id);
  };

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Flight number"
              value={flightNumber}
              onChange={(event) => setFlightNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Airplane</InputLabel>
              <Select
                value={airplane}
                onChange={onAirplaneChange}
                input={<OutlinedInput label="Airplane" />}
              >
                <MenuItem value={flightForEditing?.airplaneModel}>
                  {flightForEditing?.airplaneModel}
                </MenuItem>
                {freeAirplanes.map((airplane) => (
                  <MenuItem
                    key={airplane.id}
                    id={airplane.id}
                    value={airplane.model}
                  >
                    {airplane.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Departure airport</InputLabel>
              <Select
                value={departureAirport}
                onChange={onDepartureAirportChange}
                input={<OutlinedInput label="Departure airport" />}
              >
                <MenuItem value={flightForEditing?.fromAirportName}>
                  {flightForEditing?.fromAirportName}
                </MenuItem>
                {airports.map((airport) => (
                  <MenuItem
                    key={airport.id}
                    id={airport.id}
                    value={airport.name}
                  >
                    {airport.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Arrival airport</InputLabel>
              <Select
                value={arrivalAirport}
                onChange={onArrivalAirportChange}
                input={<OutlinedInput label="Arrival airport" />}
              >
                <MenuItem value={flightForEditing?.toAirportName}>
                  {flightForEditing?.toAirportName}
                </MenuItem>
                {airports.map((airport) => (
                  <MenuItem
                    key={airport.id}
                    id={airport.id}
                    value={airport.name}
                  >
                    {airport.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Departure time"
                inputVariant="outlined"
                fullWidth
                variant="inline"
                value={departureDate}
                onChange={(value) => setDepartureDate(value)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Arrival time"
                inputVariant="outlined"
                fullWidth
                variant="inline"
                value={arrivalDate}
                onChange={(value) => setArrivalDate(value)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onResetClick}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onSaveClick}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default FlightEditDialogContent;
