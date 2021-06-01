import React, { useState, useEffect } from 'react';
import FlightsList from '../flights-list';
import Filter from '../../filter-panel';
import API from '../../../api';
import TokenService from '../../../services/token-service';
import { useSelector } from 'react-redux'

const FlightsPage = () => {
    const jwtToken = useSelector((state) => state.jwtToken.value)
    const refreshToken = useSelector((state) => state.refreshToken.value)
    let tokenService = new TokenService();

    const [ cities, setCities ] = useState([]);
    const [ selectedValues, setSelectedValues ] = useState([]);
    const [ departureCity, setDepartureCity ] = useState('');
    const [ arrivalCity, setArrivalCity ] = useState('');

    useEffect(() => {
        const loadCities = async () => {
            await API.get(`/cities`, { headers: {"Authorization" : `Bearer ${jwtToken}`} })
            .then(response => response.data)
            .then(data => setCities(data))
            .catch(error => {
                console.log(error);
                if (refreshToken) tokenService.refreshCurrentToken(refreshToken);
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