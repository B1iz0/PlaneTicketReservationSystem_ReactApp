import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { getFlight } from 'api/apiRequests';

import FlightReservationStepper from './FlightReservationStepper';

const FLightReservationPage = () => {
  const location = useLocation();
  let history = useHistory();

  const [flight, setFlight] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const responseFlight = await getFlight(location.state?.flight.id);
      setFlight(responseFlight);
    };

    fetchData();
  }, [location.state?.flight.id]);

  const handleBackToFlights = () => {
    history.push('/');
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleBackToFlights}
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>
      <FlightReservationStepper flight={flight || location.state?.flight} />
    </div>
  );
};

export default FLightReservationPage;
