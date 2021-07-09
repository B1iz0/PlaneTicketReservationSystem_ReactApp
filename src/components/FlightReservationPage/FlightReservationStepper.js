import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SelectedFlightStep from './SelectedFlightStep';
import PlaceSelectionStep from './PlaceSelectionStep';

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
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [baggageWeight, setBaggageWeight] = useState();
  const [isBaggageServiceChecked, setIsBaggageServiceChecked] = useState(false);

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
            handleBaggageWeightChange={handleBaggageWeightChange}
          />
        );
      case 2:
        return (
          <div/>
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
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default FlightReservationStepper;