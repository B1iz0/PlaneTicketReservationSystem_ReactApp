import React, { useState, useEffect } from 'react';
import FlightsList from '../flights-list';
import API from '../../../api';

const FlightsPage = () => {
    const [ flights, setFlights ] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await API.get('/flights', { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwiZW1haWwiOiJhZG1pbiIsInJvbGUiOiJBZG1pbkFwcCIsIm5iZiI6MTYyMjA5NjU4OCwiZXhwIjoxNjIyMDk2NjQ4LCJpYXQiOjE2MjIwOTY1ODgsImlzcyI6IkF1dGhTZXJ2ZXIiLCJhdWQiOiJBdXRoQ2xpZW50In0.kAqlloc3CKxiU5Q--m0AvlPe2WHM7ntJmyrpsHXm0t8`} })
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