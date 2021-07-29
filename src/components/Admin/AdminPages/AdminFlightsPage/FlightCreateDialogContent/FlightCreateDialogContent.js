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
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { getAllAirports } from 'api/airportRequests';
import { postFlight } from 'api/flightRequests';
import { getFreeAirplanes } from 'api/airplaneRequests';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: '100%',
  },
}));

const FlightCreateDialogContent = ({ closeDialog }) => {
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
  const [freeBaggageLimit, setFreeBaggageLimit] = useState();
  const [overweightPrice, setOverweightPrice] = useState();

  const [airplane, setAirplane] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const freeAirplanes = await getFreeAirplanes();
      const allAirports = await getAllAirports();

      setFreeAirplanes(freeAirplanes);
      setAirports(allAirports);
    };

    fetchData();
  }, [token]);

  const createFlight = async () => {
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

    await postFlight(
      airplaneId,
      flightNumber,
      departureAirportId,
      arrivalAirportId,
      departureTimeWithoutTZ,
      arrivalTimeWithoutTZ,
      freeBaggageLimit,
      overweightPrice
    );
  };

  const handleCreate = async () => {
    await createFlight();
    closeDialog();
  };

  return (
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
                  {freeAirplanes?.map((item) => (
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
                    {airports?.map((item) => (
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
                    {airports?.map((item) => (
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
                    onChange={(value) => setDepartureDate(value)}
                    variant="inline"
                    label="Departure date"
                  />
                </Grid>
                <Grid item lg={6}>
                  <DateTimePicker
                    className={classes.formField}
                    value={arrivalDate}
                    onChange={(value) => setArrivalDate(value)}
                    variant="inline"
                    label="Arrival date"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={6}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Free baggage limit"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                }}
                onChange={(e) => setFreeBaggageLimit(e.target.value)}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Overweight price for 1 Kg"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={(e) => setOverweightPrice(e.target.value)}
              />
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
