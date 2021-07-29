import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import { getCountries } from 'api/locationRequests';
import { postCompany } from 'api/companyRequests';
import {
  setIsSimpleSuccessNotificationActive,
  setSimpleSuccessNotificationText,
} from 'reduxStore/notificationsSlice';

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: '100%',
  },
}));

const CompanyCreateDialogContent = ({ closeDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);

  const [companyName, setCompanyName] = useState('');
  const [companyCountry, setCompanyCountry] = useState(null);

  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [isCompanyCountryValid, setIsCompanyCountryValid] = useState(true);

  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [countriesResponse, countriesError] = await getCountries();
      if (countriesResponse) setCountries(countriesResponse);
      if (countriesError) {
        // Handle error.
      }
    };

    fetchData();
  }, []);

  const handleClearClick = () => {
    setCompanyName('');
    setCompanyCountry(null);
  };

  const handleCreateClick = async () => {
    setIsErrorResponse(false);
    setErrorHelperText('');
    let isValid = true;
    if (!companyName) {
      isValid = false;
      setIsCompanyNameValid(false);
    } else setIsCompanyNameValid(true);
    if (!companyCountry || !companyCountry.id) {
      isValid = false;
      setIsCompanyCountryValid(false);
    } else setIsCompanyCountryValid(true);

    if (isValid) {
      const [createdCompany, creationError] = await postCompany({
        name: companyName,
        countryId: companyCountry.id,
      });
      if (createdCompany) {
        dispatch(setIsSimpleSuccessNotificationActive(true));
        dispatch(
          setSimpleSuccessNotificationText(
            'The company was created successfully!'
          )
        );
        closeDialog();
      }
      if (creationError) {
        setIsErrorResponse(true);
        setErrorHelperText(creationError.response.data.message);
      }
    }
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={!isCompanyNameValid}
              helperText={!isCompanyNameValid && 'This field is required'}
              className={classes.inputField}
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              required
              variant="outlined"
              label="Company name"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.name}
              value={companyCountry}
              onChange={(event, newValue) => setCompanyCountry(newValue)}
              renderInput={(params) => (
                <TextField
                  error={!isCompanyCountryValid}
                  helperText={
                    !isCompanyCountryValid && 'This field is required'
                  }
                  required
                  {...params}
                  label="Country"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            {isErrorResponse && (
              <Typography variant="body1" color="error">
                {errorHelperText}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClearClick()}>Clear</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreateClick()}
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
};

export default CompanyCreateDialogContent;
