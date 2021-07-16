import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router-dom';

import FlightsItemInfo from '../FlightsItemInfo';

const useStyles = makeStyles((theme) => ({
  flightInfo: {
    width: '800px',
    margin: 'auto',
    padding: '24px',
  },
  companyName: {
    alignSelf: 'center',
  },
  airplaneIcon: {
    alignSelf: 'center',
    transform: 'rotate(90deg)',
  },
  bookButton: {
    marginLeft: 'auto',
  },
  dividedLine: {
    margin: '0',
  },
  airplaneInfo: {
    flexGrow: 1,
  },
}));

const FlightsItem = ({ flight }) => {
  const classes = useStyles();
  let history = useHistory();

  const handleBookClick = () => {
    history.push({
      pathname: '/reservation',
      state: { flight: flight }
    });
  }

  return (
    <Grid item container>
      <Card className={classes.flightInfo} variant="outlined">
        <Grid container direction="column" spacing={2}>
          <hr className={classes.dividedLine}></hr>
          <FlightsItemInfo flight={flight}/>
          <hr className={classes.dividedLine}></hr>
          <Grid item container>
            <Button
              variant="contained"
              color="primary"
              className={classes.bookButton}
              onClick={handleBookClick}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default FlightsItem;
