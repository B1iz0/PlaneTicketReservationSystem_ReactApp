import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { postBooking } from 'api/apiRequests';
import { getId } from 'services/token-service';
import { 
  setFirstNameValid,
  setLastNameValid,
  setEmailValid,
} from 'reduxStore/customerInfoSlice';
import {
  setIsBookingCreationActive,
} from 'reduxStore/notificationsSlice';

import SelectedFlightStep from './SelectedFlightStep';
import PlaceSelectionStep from './PlaceSelectionStep';
import ContactDetailsStep from './ContactDetailsStep';
import FinalPriceStep from './FinalPriceStep';

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
  errorMessage: {
    padding: theme.spacing(1),
  }
}));

const selectedFlightStepTitle = 'Selected flight';
const placeSelectionStepTitle = 'Select places';
const contactDetailsStepTitle = 'Contact details';
const finalPriceStepTitle = 'Final price';

const getSteps = () => {
  return [selectedFlightStepTitle, placeSelectionStepTitle, contactDetailsStepTitle, finalPriceStepTitle];
}

const FlightReservationStepper = ({ flight }) => {
  const classes = useStyles();
  const history = useHistory();
  const customerInfo = useSelector((state) => state.customerInfo);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [baggageWeight, setBaggageWeight] = useState(0);
  const [isBaggageServiceChecked, setIsBaggageServiceChecked] = useState(false);

  const [isReservationValid, setIsReservationValid] = useState(true);
  const [errorHelperText, setErrorHelperText] = useState('');

  const [placesTotalPrice, setPlacesTotalPrice] = useState(0);
  const [baggageTotalPrice, setBaggageTotalPrice] = useState(0);

  const handleBaggageWeightChange = (event) => {
    if (event.target.value > flight.freeBaggageLimitInKilograms) {
      setBaggageTotalPrice(Math.ceil(event.target.value - flight.freeBaggageLimitInKilograms) * flight.overweightPrice);
    } else {
      setBaggageTotalPrice(0);
    };
    setBaggageWeight(event.target.value);
  }

  const handleBaggageChecked = (event) => {
    setIsBaggageServiceChecked(event.target.checked);
  };

  const getPlacePrice = (place, prices) => {
    for (let i = 0; i < prices.length; i++) {
      if (place.placeType === prices[i].placeType) return prices[i].ticketPrice;
    };
    return 0;
  };

  const handlePlaceSelection = (place) => {
    setPlacesTotalPrice(() => placesTotalPrice + getPlacePrice(place, flight.airplane.prices));
    setSelectedPlaces([
      ...selectedPlaces,
      place
    ]);
  }

  const handlePlaceRejection = (place) => {
    const newSelectedPlaces = selectedPlaces.filter((value) => 
      value.id !== place.id
    );
    setPlacesTotalPrice(() => placesTotalPrice - getPlacePrice(place, flight.airplane.prices));
    setSelectedPlaces(newSelectedPlaces);
  }

  const handleNext = async () => {
    if (steps[activeStep] === placeSelectionStepTitle) {
      if (selectedPlaces.length === 0) {
        setIsReservationValid(false);
        setErrorHelperText('You have to choose places in airplane');
      } else {
        setIsReservationValid(true);
        setErrorHelperText('');
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (steps[activeStep] === contactDetailsStepTitle) {
      let isCustomInfoValid = true;
      if (!customerInfo.firstName.value) {
        dispatch(setFirstNameValid(false));
        isCustomInfoValid = false;
      }
      if (!customerInfo.lastName.value) {
        dispatch(setLastNameValid(false));
        isCustomInfoValid = false;
      }
      if (!customerInfo.email.value) {
        dispatch(setEmailValid(false));
        isCustomInfoValid = false;
      }
      if (isCustomInfoValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    const placesId = selectedPlaces.map(value => value.id);
    const [createdBookingId, error] = await postBooking({
      flightId: flight.id,
      userId: getId(token.jwtToken),
      placesId: placesId,
      baggageWeightInKilograms: parseFloat(baggageWeight),
      customerFirstName: customerInfo.firstName.value,
      customerLastName: customerInfo.lastName.value,
      customerEmail: customerInfo.email.value,
      placesTotalPrice: placesTotalPrice,
      baggageTotalPrice: baggageTotalPrice,
    })
    if (createdBookingId) {
      dispatch(setIsBookingCreationActive(true));
      history.goBack();
    } else {
      setIsReservationValid(false);
      setErrorHelperText(error.response?.data?.message);
    }
  }

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
      case 3: 
        return (
          <FinalPriceStep 
            placesTotalPrice={placesTotalPrice}
            baggageTotalPrice={baggageTotalPrice}
            flight={flight}
            places={selectedPlaces}
            baggageWeight={baggageWeight}
          />
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
              {!isReservationValid && <Typography className={classes.errorMessage} variant='h6' color='error'>{errorHelperText}</Typography>}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  { 
                    activeStep === steps.length - 1 ? 
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      className={classes.button}
                    >
                      Finish
                    </Button> : 
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                    }
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