import React from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import FlightReservationStepper from './FlightReservationStepper';

const FLightReservationPage = () => {
  const location = useLocation();
  let history = useHistory();

  const handleBackToFlights = () => {
    history.push('/');
  }

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
      <FlightReservationStepper flight={location.state?.flight}/>
    </div>
  );
};

export default FLightReservationPage;