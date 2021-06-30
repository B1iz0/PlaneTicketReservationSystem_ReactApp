import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { getFreeAirplanes, getAllAirports, putFlight } from 'api/apiRequests';

const FlightEditDialogContent = ({ flightForEditing, closeDialog }) => {
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
    }

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
    )
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
    <DialogContent>
      <form>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              required
              label="Flight number"
              value={flightNumber}
              onChange={(event) => setFlightNumber(event.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel>Airplane</InputLabel>
              <Select
                value={airplane}
                onChange={onAirplaneChange}
                input={<Input />}
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
          <Grid item>
            <FormControl>
              <InputLabel>Departure airport</InputLabel>
              <Select
                value={departureAirport}
                onChange={onDepartureAirportChange}
                input={<Input />}
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
          <Grid item>
            <FormControl>
              <InputLabel>Arrival airport</InputLabel>
              <Select
                value={arrivalAirport}
                onChange={onArrivalAirportChange}
                input={<Input />}
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
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                value={departureDate}
                onChange={(value) => setDepartureDate(value)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                value={arrivalDate}
                onChange={(value) => setArrivalDate(value)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
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
      </form>
    </DialogContent>
  );
};

export default FlightEditDialogContent;
