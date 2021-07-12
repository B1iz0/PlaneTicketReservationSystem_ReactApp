import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SelectedFlightStep from './SelectedFlightStep';
import PlaceSelectionStep from './PlaceSelectionStep';
import ContactDetailsStep from './ContactDetailsStep';
import { postBooking } from 'api/apiRequests';
import { getId } from 'services/token-service';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const getSteps = () => {
  return ['Selected flight', 'Select places', 'Contact details'];
}

const FlightReservationStepper = ({ flight }) => {
  const classes = useStyles();
  const customerInfo = useSelector((state) => state.customerInfo);
  const token = useSelector((state) => state.token);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [baggageWeight, setBaggageWeight] = useState();
  const [isBaggageServiceChecked, setIsBaggageServiceChecked] = useState(false);

  const [isReservationValid, setIsReservationValid] = useState(true);
  const [errorHelperText, setErrorHelperText] = useState('');

  const handleBaggageWeightChange = (event) => {
    setBaggageWeight(event.target.value);
  }

  const handleBaggageChecked = (event) => {
    setIsBaggageServiceChecked(event.target.checked);
  };

  const handlePlaceSelection = (place) => {
    setSelectedPlaces([
      ...selectedPlaces,
      place
    ]);
  }

  const handlePlaceRejection = (place) => {
    const newSelectedPlaces = selectedPlaces.filter((value) => 
      value.id !== place.id
    );
    setSelectedPlaces(newSelectedPlaces);
  }

  const handleNext = async () => {
    if (activeStep === 1) {
      if (selectedPlaces.length === 0) {
        setIsReservationValid(false);
        setErrorHelperText('You have to choose places in airplane');
        setActiveStep(1);
      } else {
        setIsReservationValid(true);
        setErrorHelperText('');
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === steps.length - 1) {
      if (customerInfo.firstName.isValid
        && customerInfo.lastName.isValid
        && customerInfo.email.isValid) {
          const placesId = selectedPlaces.map(value => value.id);
          await postBooking({
            flightId: flight.id,
            userId: getId(token.jwtToken),
            placesId: placesId,
            baggageWeightInKilograms: parseFloat(baggageWeight),
          })
        } 
    } else {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SelectedFlightStep 
            selectedFlight={flight}
          />
        );
      case 1:
        return (
          <PlaceSelectionStep 
            selectedPlaces={selectedPlaces}
            selectedFlight={flight} 
            handlePlaceSelection={handlePlaceSelection} 
            handlePlaceRejection={handlePlaceRejection}
            isBaggageServiceChecked={isBaggageServiceChecked}
            handleBaggageChecked={handleBaggageChecked}
            baggageWeight={baggageWeight}
            handleBaggageWeightChange={handleBaggageWeightChange}
          />
        );
      case 2:
        return (
          <ContactDetailsStep />
        );
      default:
        return 'Unknown step';
    }
  }
  
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              {!isReservationValid && <Typography color='error'>{errorHelperText}</Typography>}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default FlightReservationStepper;