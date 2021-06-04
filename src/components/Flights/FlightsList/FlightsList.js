import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

import FlightsItem from "../FlightsItem";
import { flightsOnPage } from "../../../constants";
import API from "../../../api";
import {
  allFlightsEndPoint,
  allFlightsCountEndPoint,
} from "../../../constants";

const useStyles = makeStyles((theme) => ({
  flightList: {
    padding: "24px",
  },
  pagination: {
    margin: "auto",
  },
}));

const FlightsList = ({ departureCity, arrivalCity }) => {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [amountOfPages, setPagesAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await API.get(`${allFlightsEndPoint}`, {
        params: {
          offset: offset,
          limit: flightsOnPage,
          departureCity: departureCity,
          arrivalCity: arrivalCity,
        },
      })
        .then((response) => response.data)
        .then((data) => setFlights(data))
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };
    const getFlightsAmount = async () => {
      await API.get(`${allFlightsCountEndPoint}`, {
        params: {
          departureCity: departureCity,
          arrivalCity: arrivalCity,
        },
      })
        .then((response) => response.data)
        .then((data) => {
          setPagesAmount(Math.ceil(data / flightsOnPage));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };

    getFlightsAmount();
    loadData();
  }, [departureCity, arrivalCity, page, offset]);

  const handlePageChange = (event, value) => {
    console.log(value);
    setOffset((value - 1) * flightsOnPage);
    setPage(value);
  };

  return flights.length ? (
    <div className={classes.flightList}>
      <Grid container direction="column" spacing={3}>
        {flights.map((flight) => {
          return <FlightsItem flight={flight} id={flight.id} key={flight.id} />;
        })}
        <Grid item container>
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
