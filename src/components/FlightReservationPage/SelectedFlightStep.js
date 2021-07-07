import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

const SelectedFlightStep = ({ selectedFlight, selectedFlight: { airplane, from, to } }) => {
  return (
    <>
      <Typography variant="h3">
        {airplane.company.name}
      </Typography>
      <Paper>
        <Grid container>
          <Grid item>
            <Typography>
              {airplane.model}
            </Typography>
            <Typography>
              ({airplane.airplaneType.typeName})
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SelectedFlightStep;