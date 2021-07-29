import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import FlightsItemInfo from 'components/FlightsPage/FlightsItemInfo';

const useStyles = makeStyles((theme) => ({
  selectedFlightPaper: {
    padding: theme.spacing(3),
  },
}));

const SelectedFlightStep = ({ selectedFlight }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.selectedFlightPaper}>
      <FlightsItemInfo flight={selectedFlight} />
    </Paper>
  );
};

export default SelectedFlightStep;
