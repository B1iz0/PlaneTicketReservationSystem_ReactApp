import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  baggageService: {
    padding: theme.spacing(2),
  },
  baggageWeightField: {
    width: '100%',
  },
  baggageServices: {
    padding: "15px",
  },
}));

const BaggageRegistration = (
  { 
    selectedFlight, 
    isBaggageServiceChecked, 
    handleBaggageChecked,
    baggageWeight,
    handleBaggageWeightChange
  }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.baggageService}>
      <FormControlLabel 
        control={<Checkbox checked={isBaggageServiceChecked} onChange={handleBaggageChecked}/>}
        label="Will you have baggage?"
      />
      { 
        isBaggageServiceChecked ? 
          <Grid container spacing={2}>
            <Grid item lg>
              <TextField 
                className={classes.baggageWeightField}
                required
                variant="outlined"
                type="number"
                label="Your baggage weight"
                defaultValue={baggageWeight}
                onChange={handleBaggageWeightChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>
                }}
              />
            </Grid>
            <Grid item lg={8}>
              <Paper
                className={classes.baggageServices}
                variant="outlined"
              >
                <Grid container>
                  <Grid item lg={12}>
                    <Typography 
                      align="right"
                    >
                      Price for 1 Kg overweight: {selectedFlight?.overweightPrice} $
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography 
                      align="right"
                    >
                      Free Baggage Limit: {selectedFlight?.freeBaggageLimitInKilograms} Kg
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography 
                      align="right"
                    >
                      Maximum Baggage Limit: {selectedFlight?.airplane?.onePersonBaggageLimitInKilograms} Kg
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        : null 
      }
    </Paper>
  );
};

export default BaggageRegistration;