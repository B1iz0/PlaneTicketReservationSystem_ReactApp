import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
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
import {
  getEmail,
} from 'services/token-service';

const useStyles = makeStyles((theme) => ({
  contactDetailsPaper: {
    padding: theme.spacing(2),
  },
  contactDetailsField: {
    width: '100%',
  },
}));

const ContactDetailsStep = () => {
  const classes = useStyles();
  const customerInfo = useSelector((state) => state.customerInfo);
  const token = useSelector((state) => state.token);
  const userEmail = getEmail(token.jwtToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail !== customerInfo.email) {
      dispatch(setEmail(userEmail));
    }
  }, [customerInfo.email, userEmail, dispatch]);

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
    <Paper 
      className={classes.contactDetailsPaper}
    >
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <TextField 
            className={classes.contactDetailsField}
            error={!customerInfo.email.isValid}
            helperText={!customerInfo.email.isValid && emailErrorHelperText}
            variant="outlined"
            required
            label="Email"
            disabled={ userEmail ? true : false }
            value={customerInfo.email.value}
            onChange={(event) => handleEmailChange(event)}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField 
            className={classes.contactDetailsField}
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
            className={classes.contactDetailsField}
            error={!customerInfo.lastName.isValid}
            helperText={!customerInfo.lastName.isValid && 'This field is required'}
            variant="outlined"
            required
            label="Last Name"
            value={customerInfo.lastName.value}
            onChange={(event) => handleLastNameChange(event)}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField 
            className={classes.contactDetailsField}
            variant="outlined"
            label="Phone number"
            value={customerInfo.phone}
            onChange={(event) => handlePhoneChange(event)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactDetailsStep;