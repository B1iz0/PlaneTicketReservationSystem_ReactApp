import React, { useState, useEffect } from 'react';
import FlightsList from '../flights-list';
import Filter from '../../filter-panel';
import API from '../../../api';

const FlightsPage = () => {
    const [ cities, setCities ] = useState([]);
    const [ selectedValues, setSelectedValues ] = useState([]);
    const [ departureCity, setDepartureCity ] = useState('');
    const [ arrivalCity, setArrivalCity ] = useState('');

    useEffect(() => {
        const loadCities = async () => {
            await API.get(`/cities`)
            .then(response => response.data)
            .then(data => setCities(data))
            .catch(error => {
                console.log(error);
            });
        }

        loadCities();
    }, []); 

    const onFilterConfirmed = (values) => {
        setSelectedValues(values)
        setDepartureCity(values[0]);
        setArrivalCity(values[1]);
    }

    return(
        <>
            <Filter fields={[ 'Departure city', 'Arrival city' ]} fieldsOptions={[ cities, cities ]} onFilterConfirmed={onFilterConfirmed}/>
            <FlightsList departureCity={departureCity} arrivalCity={arrivalCity}/>
        </>
    );
};

export default FlightsPage;