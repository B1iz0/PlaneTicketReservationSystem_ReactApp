import React, { useState, useEffect } from 'react';
import FlightsList from '../flights-list';
import API from '../../../api';

const FlightsPage = () => {
    const [ flights, setFlights ] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await API.get('/flights', { headers: {"Authorization" : `Bearer `} })
            .then(response => response.data)
            .then(data => setFlights(data))
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        }

        loadData();
    }, []);

    return(
        <>
            <FlightsList flights={flights}/>
        </>
    );
};

export default FlightsPage;