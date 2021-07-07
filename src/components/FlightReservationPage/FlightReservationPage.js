import React from 'react';
import { useLocation } from "react-router-dom";

import FlightReservationStepper from './FlightReservationStepper';

const FLightReservationPage = () => {
  const location = useLocation();

  return (
    <div>
     <FlightReservationStepper flight={location.state?.flight}/>
    </div>
  );
};

export default FLightReservationPage;