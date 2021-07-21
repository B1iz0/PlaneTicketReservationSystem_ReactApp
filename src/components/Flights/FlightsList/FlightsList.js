import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import { getFilteredFlights, getFlightsCount } from 'api/apiRequests';
import { flightsOnPage } from 'constants';

import FlightsItem from '../FlightsItem';

const useStyles = makeStyles((theme) => ({
  flightList: {
    padding: '24px',
  },
  pagination: {
    margin: 'auto',
  },
}));

const FlightsList = ({ departureCity, arrivalCity }) => {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [amountOfPages, setPagesAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getFilteredFlights(
        offset,
        flightsOnPage,
        departureCity,
        arrivalCity
      );
      const flightsCount = await getFlightsCount(departureCity, arrivalCity);

      setFlights(flights);
      setPagesAmount(Math.ceil(flightsCount / flightsOnPage));
    };

    fetchData();
  }, [departureCity, arrivalCity, page, offset]);

  const handlePageChange = (event, value) => {
    console.log(value);
    setOffset((value - 1) * flightsOnPage);
    setPage(value);
  };

  return flights.length ? (
    <div className={classes.flightList}>
      <Grid container spacing={3}>
        {flights.map((flight) => {
          return <FlightsItem flight={flight} id={flight.id} key={flight.id} />;
        })}
        <Grid item container lg={12}>
          <Pagination
            count={amountOfPages}
            shape="rounded"
            className={classes.pagination}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>
      <h1>No flights</h1>
    </div>
  );
};

export default FlightsList;
