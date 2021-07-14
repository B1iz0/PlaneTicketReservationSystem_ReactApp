import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { getUniquePlacesInfo } from 'services/bookingPlacesService';

const useStyles = makeStyles((theme) => ({
  finalPricePaper: {
    padding: theme.spacing(2),
  },
}));

const FinalPriceStep = ({ placesTotalPrice, baggageTotalPrice, flight, flight: {
  airplane: { prices }, freeBaggageLimitInKilograms, overweightPrice
}, places, baggageWeight }) => {
  const classes = useStyles();

  const [uniquePlacesInfo] = useState(() => getUniquePlacesInfo(places, prices));
      
  return (
    <Paper 
      className={classes.finalPricePaper}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h4'>Total price: {placesTotalPrice + baggageTotalPrice || 0} $</Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper variant='outlined' className={classes.finalPricePaper}>
            <Typography variant='h6'>Places: {placesTotalPrice} $</Typography>
            <hr/>
            {uniquePlacesInfo.map(value => {
              return (
                <Typography key={value.placeType}>{value.amount} x {value.placeType}: {value.totalPrice} $ ({value.onePlacePrice} $ per 1 place)</Typography>
              )
            })}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant='outlined' className={classes.finalPricePaper}>
            <Typography variant='h6'>Baggage: {baggageTotalPrice} $</Typography>
            <hr/>
            <Typography>Your baggage: {baggageWeight} Kg (Free limit: {freeBaggageLimitInKilograms} Kg)</Typography>
            {baggageWeight > freeBaggageLimitInKilograms && <Typography>Overweight: {baggageWeight - freeBaggageLimitInKilograms} Kg</Typography>}
            <Typography>Overweight price: {baggageWeight > freeBaggageLimitInKilograms ? (baggageWeight - freeBaggageLimitInKilograms) * overweightPrice : 0} $ ({overweightPrice} $ per 1 Kg)</Typography>
          </Paper> 
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FinalPriceStep;