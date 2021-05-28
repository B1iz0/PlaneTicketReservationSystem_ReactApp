import React, { useState, useEffect } from 'react';
import FlightsItem from '../flights-list-item';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import API from '../../../api';

const useStyles = makeStyles((theme) => ({
    flightList: {
        padding: '24px',
    },
    pagination: {
        margin: 'auto',
    },
}));

const FlightsList = () => {
    const classes = useStyles();
    const flightOnPage = 4;
    let offset = 0;
    const [ page, setPage ] = useState(1);
    const [ flights, setFlights ] = useState([]);
    const [ flightsAmount, setFlightsAmount ] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            await API.get(`/flights?offset=${offset}&limit=${flightOnPage}`)
            .then(response => response.data)
            .then(data => setFlights(data))
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        }
        const getFlightsAmount = async () => {
            await API.get('/flights/count')
            .then(response => response.data)
            .then(data => setFlightsAmount(data))
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        }

        getFlightsAmount();
        loadData();
    }, []);

    const handlePageChange = (event, value) => {
        offset = (value - 1) * flightOnPage;
        setPage(value);
    }

    return flights.length ? (
        <div className={classes.flightList}>
            <Grid container direction='column' spacing={3}>
                {
                    flights.map(flight => {
                        return (
                            <FlightsItem flight={flight} id={flight.id} key={flight.id}/>
                        );
                    })
                }
                <Grid item container>
                    <Pagination count={Math.trunc(flightsAmount / flightOnPage) + 1} shape="rounded" className={classes.pagination} page={page} onChange={handlePageChange}/>
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