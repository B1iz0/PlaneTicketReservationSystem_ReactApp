import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FlightIcon from '@material-ui/icons/Flight';

import { getFlight } from 'api/apiRequests';
import PriceTable from 'components/shared/PriceTable';

const useStyles = makeStyles((theme) => ({
  infoDialog: {
    padding: theme.spacing(3),
    paddingTop: 0,
  },
  airplaneIcon: {
    alignSelf: 'center',
    transform: 'rotate(90deg)',
  },
}));

const FlightInfoDialogContent = ({ elementUrl }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [flight, setFlight] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const flight = await getFlight(elementUrl);

      setFlight(flight);
    }

    fetchData();
  }, [token, elementUrl]);

  return (
    <DialogContent className={classes.infoDialog}>
      <Grid container spacing={1}>
        <Grid item lg={12} className={classes.flightTitle}>
          <Typography component="h1" variant="h3" align="center">
            Flight: {flight?.flightNumber}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography 
            component="h1" 
            variant="h5"
            align="center"
          >
            Airplane ({flight?.airplane.model})
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography 
            variant="overline"
            display="block" 
            align="center"
          >
            Registration number: {flight?.airplane.registrationNumber}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography 
            variant="overline"
            display="block" 
            align="center"
          >
            Airplane type: {flight?.airplane.airplaneType.typeName}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography 
            variant="overline"
            display="block" 
            align="center"
          >
            Company: {flight?.airplane.company.name}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <PriceTable prices={flight?.airplane.prices} />
        </Grid>
        <Grid item container direction="column" lg={5} justify="center">
          <Grid item>
            <Typography 
              variant="overline" 
              display="block" 
              align="center"
            >
              {flight?.from.name} ({flight?.from.city.name})
            </Typography>
          </Grid>
          <Grid item>
            <Typography 
              variant="overline" 
              display="block" 
              align="center"
            >
              {flight?.departureTime}
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={2}>
          <FlightIcon className={classes.airplaneIcon}/>
        </Grid>
        <Grid item container direction="column" lg={5} justify="center">
          <Grid item>
            <Typography 
              variant="overline" 
              display="block" 
              align="center"
            >
              {flight?.to.name} ({flight?.to.city.name})
            </Typography>
          </Grid>
          <Grid item>
            <Typography 
              variant="overline" 
              display="block" 
              align="center"
            >
              {flight?.arrivalTime}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default FlightInfoDialogContent;
