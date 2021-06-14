import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FlightIcon from '@material-ui/icons/Flight';

import API from 'api';
import { refreshCurrentToken } from 'services/token-service';
import PriceTable from 'components/shared/PriceTable';

const useStyles = makeStyles((theme) => ({
  flightAirplaneInfo: {},
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
    const loadElement = async () => {
      await API.get(`${elementUrl}`, {
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setFlight(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };

    loadElement();
  }, []);

  return (
    <DialogContent>
      <Grid container direction="column">
        <Grid item className={classes.flightTitle}>
          <Typography gutterBottom component="h1" variant="h3" align="center">
            Flight: {flight?.flightNumber}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.flightAirplaneInfo}
        >
          <Grid item>
            <Typography gutterBottom component="h1" variant="h5">
              Airplane ({flight?.airplane.model})
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item md={6}>
              <Typography align="left">Registration number:</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography align="center">
                {flight?.airplane.registrationNumber}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item md={6}>
              <Typography align="left">Airplane type:</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography align="center">
                {flight?.airplane.airplaneType.typeName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item md={6}>
              <Typography align="left">Company:</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography align="center">
                {flight?.airplane.company.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <PriceTable prices={flight?.airplane.prices} />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item container direction="column" md={5} justify="center">
              <Grid item>
                <Typography>
                  {flight?.from.name} ({flight?.from.city.name})
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{flight?.departureDate}</Typography>
              </Grid>
            </Grid>
            <Grid item className={classes.airplaneIcon} md={2}>
              <FlightIcon />
            </Grid>
            <Grid item container direction="column" md={5} justify="center">
              <Grid item>
                <Typography>
                  {flight?.to.name} ({flight?.to.city.name})
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{flight?.arrivalDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default FlightInfoDialogContent;
