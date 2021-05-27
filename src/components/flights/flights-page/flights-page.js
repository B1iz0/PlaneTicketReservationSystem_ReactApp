import React, { useState, useEffect } from 'react';
import FlightsList from '../flights-list';
import API from '../../../api';

const FlightsPage = () => {
    const [ flights, setFlights ] = useState([]);
    const [ flightsAmount, setFlightsAmount ] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            await API.get('/flights')
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

    return(
        <>
            <FlightsList flights={flights} flightsAmount={flightsAmount}/>
        </>
    );
};

export default FlightsPage;