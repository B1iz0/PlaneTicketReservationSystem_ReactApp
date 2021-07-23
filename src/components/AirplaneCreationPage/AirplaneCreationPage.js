import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AirplaneCreationStep from './AirplaneCreationStep';
import FulfillAirplaneStep from './FulfillAirplaneStep';
import PricesCreationStep from './PricesCreationStep';

const getSteps = () => {
  return ['Create airplane', 'Fulfill created airplane', 'Create prices'];
};

const getStepContent = (
  step,
  handleNext,
  handleBackToAdminTable,
  createdAirplane,
  createdAirplaneId,
  handleAirplaneCreation
) => {
  switch (step) {
    case 0:
      return (
        <AirplaneCreationStep
          handleNext={handleNext}
          handleAirplaneCreation={handleAirplaneCreation}
        />
      );
    case 1:
      return (
        <FulfillAirplaneStep
          airplane={createdAirplane}
          handleNext={handleNext}
        />
      );
    case 2:
      return (
        <PricesCreationStep
          airplaneId={createdAirplaneId}
          handleBackToAdminTable={handleBackToAdminTable}
        />
      );
    default:
      return <></>;
  }
};

const AirplaneCreationPage = () => {
  let history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [createdAirplaneId, setCreatedAirplaneId] = useState();
  const [createdAirplane, setCreatedAirplane] = useState();

  const handleAirplaneCreation = (airplane) => {
    setCreatedAirplane(airplane);
    setCreatedAirplaneId(airplane?.id);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackToAdminTable = () => {
    history.goBack();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleBackToAdminTable}
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(
                index,
                handleNext,
                handleBackToAdminTable,
                createdAirplane,
                createdAirplaneId,
                handleAirplaneCreation
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default AirplaneCreationPage;
