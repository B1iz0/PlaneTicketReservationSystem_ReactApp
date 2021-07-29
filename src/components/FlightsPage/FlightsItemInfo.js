import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FlightIcon from '@material-ui/icons/Flight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  companyName: {
    alignSelf: 'center',
  },
  airplaneIcon: {
    alignSelf: 'center',
    transform: 'rotate(90deg)',
  },
  airplaneInfo: {
    flexGrow: 1,
  },
}));

const FlightsItemInfo = ({
  flight: { airplane, from, to, arrivalTime, departureTime },
}) => {
  const classes = useStyles();

  return (
    <Grid item container spacing={3}>
      <Grid item className={classes.companyName}>
        <Typography variant="h3" align="center">
          {airplane.company.name}
        </Typography>
      </Grid>
      <Grid item className={classes.airplaneInfo}>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle1" align="center">
              {airplane.model}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              ({airplane.airplaneType.typeName})
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle1" align="center">
              {departureTime.split('T')[1]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              {departureTime.split('T')[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="subtitle1" align="center">
                  {from.city.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" align="center">
                  "{from.name}"
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.airplaneIcon}>
        <FlightIcon />
      </Grid>
      <Grid item>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle1" align="center">
              {arrivalTime.split('T')[1]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              {arrivalTime.split('T')[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="subtitle1" align="center">
                  {to.city.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" align="center">
                  "{to.name}"
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FlightsItemInfo;
