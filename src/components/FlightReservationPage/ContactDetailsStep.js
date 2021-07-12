import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { 
  setFirstName,
  setFirstNameValid,
  setLastName,
  setLastNameValid,
  setEmail,
  setEmailValid,
  setPhone
} from 'reduxStore/customerInfoSlice';
import {
  checkEmail,
  checkFirstName,
  checkLastName,
} from 'services/authorizationValidation';

const ContactDetailsStep = () => {
  const customerInfo = useSelector((state) => state.customerInfo);
  const dispatch = useDispatch();

  const handleFirstNameChange = async (event) => {
    dispatch(setFirstName(event.target.value));
    
    const validationResult = await checkFirstName(event.target.value);
    if (validationResult.isNotValid) dispatch(setFirstNameValid(false));
    else dispatch(setFirstNameValid(true));
  };

  const handleLastNameChange = async (event) => {
    dispatch(setLastName(event.target.value));
    
    const validationResult = await checkLastName(event.target.value);
    if (validationResult.isNotValid) dispatch(setLastNameValid(false));
    else dispatch(setLastNameValid(true));
  };

  const handleEmailChange = async (event) => {
    dispatch(setEmail(event.target.value));
    
    const validationResult = await checkEmail(event.target.value);
    setEmailErrorHelperText(validationResult.errorMessage);
    if (validationResult.isNotValid) dispatch(setEmailValid(false))
    else dispatch(setEmailValid(true));
  };

  const handlePhoneChange = async (event) => {
    dispatch(setPhone(event.target.value));
  };

  const [emailErrorHelperText, setEmailErrorHelperText] = useState('');
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TextField 
            error={!customerInfo.firstName.isValid}
            helperText={!customerInfo.firstName.isValid && 'This field is required'}
            variant="outlined"
            required
            label="First name"
            value={customerInfo.firstName.value}
            onChange={(event) => handleFirstNameChange(event)}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField 
            error={!customerInfo.lastName.isValid}
            helperText={!customerInfo.lastName.isValid && 'This field is required'}
            variant="outlined"
            required
            label="Last Name"
            value={customerInfo.lastName.value}
            onChange={(event) => handleLastNameChange(event)}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField 
            error={!customerInfo.email.isValid}
            helperText={!customerInfo.email.isValid && emailErrorHelperText}
            variant="outlined"
            required
            label="Email"
            value={customerInfo.email.value}
            onChange={(event) => handleEmailChange(event)}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField 
            variant="outlined"
            label="Phone number"
            value={customerInfo.phone}
            onChange={(event) => handlePhoneChange(event)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactDetailsStep;