import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FlightsList from "../FlightsList";
import Filter from "../../Filter";
import API from "../../../api";
import { refreshCurrentToken } from "../../../services/token-service";
import { allCtitesEndPoint } from "../../../constants";

const FlightsPage = () => {
  const token = useSelector((state) => state.token);
  const [cities, setCities] = useState([]);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");

  useEffect(() => {
    const loadCities = async () => {
      await API.get(`${allCtitesEndPoint}`)
        .then((response) => response.data)
        .then((data) => setCities(data))
        .catch((error) => {
          console.log(error);
          if (token.refreshToken) {
            refreshCurrentToken(token.refreshToken);
          }
        });
    };

    loadCities();
  }, [token]);

  const onFilterConfirmed = (values) => {
    setDepartureCity(values[0]);
    setArrivalCity(values[1]);
  };

  return (
    <>
      <Filter
        fields={["Departure city", "Arrival city"]}
        fieldsOptions={[cities, cities]}
        onFilterConfirmed={onFilterConfirmed}
      />
      <FlightsList departureCity={departureCity} arrivalCity={arrivalCity} />
    </>
  );
};

export default FlightsPage;
