import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import {
  setIsSimpleSuccessNotificationActive,
  setSimpleSuccessNotificationText,
} from 'reduxStore/notificationsSlice';
import { getCountries } from 'api/locationRequests';
import { putCompany } from 'api/companyRequests';

const useStyles = makeStyles((theme) => ({
  countryNameField: {
    marginBottom: theme.spacing(2),
    minWidth: 300,
  },
}));

const CompanyEditDialogContent = ({
  company,
  company: { name, country },
  closeDialog,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);

  const [currentCompanyName, setCurrentCompanyName] = useState(name);
  const [currentCompanyCountry, setCurrentCompanyCountry] = useState(country);

  const [isCurrentCompanyNameValid, setIsCurrentCompanyNameValid] =
    useState(true);
  const [isCurrentCompanyCountryValid, setIsCurrentCompanyCountryValid] =
    useState(true);

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

  const handleCompanyNameChange = (newValue) => {
    setCurrentCompanyName(newValue);
  };

  const handleResetClick = () => {
    setCurrentCompanyName(name);
    setCurrentCompanyCountry(country);
    setIsCurrentCompanyNameValid(true);
    setIsCurrentCompanyCountryValid(true);
  };

  const handleSaveClick = async () => {
    let isValid = true;

    if (!currentCompanyName) {
      setIsCurrentCompanyNameValid(false);
      isValid = false;
    } else setIsCurrentCompanyNameValid(true);

    if (!currentCompanyCountry) {
      setIsCurrentCompanyCountryValid(false);
      isValid = false;
    } else setIsCurrentCompanyCountryValid(true);

    if (isValid) {
      const updateCompanyVersion = {
        id: company.id,
        name: currentCompanyName,
        countryId: currentCompanyCountry.id,
      };
      const [updateResponse, updateError] = await putCompany(
        updateCompanyVersion
      );
      if (!updateError) {
        dispatch(setIsSimpleSuccessNotificationActive(true));
        dispatch(setSimpleSuccessNotificationText('The company was edited successfully!'));
        closeDialog();
      }
    }
  };

  return (
    <>
      <DialogContent>
        <TextField
          className={classes.countryNameField}
          value={currentCompanyName}
          onChange={(event) => handleCompanyNameChange(event.target.value)}
          label="Company name"
          variant="outlined"
          error={!isCurrentCompanyNameValid}
          helperText={!isCurrentCompanyNameValid && 'This field is required'}
        />
        <Autocomplete
          value={currentCompanyCountry}
          onChange={(event, newValue) => setCurrentCompanyCountry(newValue)}
          getOptionSelected={(option) => option.id === currentCompanyCountry.id}
          options={countries}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              error={!isCurrentCompanyCountryValid}
              helperText={
                !isCurrentCompanyCountryValid && 'This field is required'
              }
              {...params}
              label="Country"
              variant="outlined"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleResetClick}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default CompanyEditDialogContent;
