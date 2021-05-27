import React, { useState } from 'react';
import FlightsItem from '../flights-list-item';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    flightList: {
        padding: '24px',
    },
    pagination: {
        margin: 'auto',
    },
}));

const FlightsList = ({ flights }) => {
    const classes = useStyles();
    const [ page, setPage ] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
        console.log(value);
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
                    <Pagination count={10} shape="rounded" className={classes.pagination} page={page} onChange={handlePageChange}/>
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