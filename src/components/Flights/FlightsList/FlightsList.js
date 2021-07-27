import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import Filter from 'components/Filter';
import { getFilteredFlights, getFlightsCount, getFLightHints } from 'api/apiRequests';
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

const FlightsList = () => {
  let timer = null;
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [amountOfPages, setPagesAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [flights, setFlights] = useState([]);

  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');

  const [departureCityHints, setDepartureCityHints] = useState([]);
  const [arrivalCityHints, setArrivalCityHints] = useState([]);

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
  }, [page, offset]);

  useEffect(() => {
    const fetchHints = async () => {
      const hints = await getFLightHints({
        departureCity: departureCity,
        arrivalCity: arrivalCity,
      });
      const departureCities = hints.map(value => value.departureCity);
      const arrivalCities = hints.map(value => value.arrivalCity);
      setDepartureCityHints([...new Set(departureCities)]);
      setArrivalCityHints([...new Set(arrivalCities)]);
    };

    if (departureCity || arrivalCity) {
      timer = setTimeout(() => fetchHints(), 500);
      // fetchHints();
    };
  }, [departureCity, arrivalCity]);

  const handlePageChange = (event, value) => {
    console.log(value);
    setOffset((value - 1) * flightsOnPage);
    setPage(value);
  };

  const onFilterChange = (values) => {
    clearTimeout(timer);
    setDepartureCity(values[0]);
    setArrivalCity(values[1]);
    if (!values[0] && !values[1]){
      setDepartureCityHints([]);
      setArrivalCityHints([]);
    };
  };

  const onSearchClick = async () => {
    const flights = await getFilteredFlights(
      offset,
      flightsOnPage,
      departureCity,
      arrivalCity
    );
    const flightsCount = await getFlightsCount(departureCity, arrivalCity);

    setFlights(flights);
    setPagesAmount(Math.ceil(flightsCount / flightsOnPage));
  }

  return (
    <>
      <Filter 
        fields={['Departure city', 'Arrival city']}
        fieldsOptions={[departureCityHints, arrivalCityHints]}
        onFilterConfirmed={onFilterChange}
        onSearchClick={onSearchClick}
      />
      {
        flights.length ? (
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
        )
      }
    </>
  ) 
};

export default FlightsList;
