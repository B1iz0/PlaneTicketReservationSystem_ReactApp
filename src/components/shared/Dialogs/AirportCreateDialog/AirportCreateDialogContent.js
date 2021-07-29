import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import { getCities } from 'api/locationRequests';
import { postAirport } from 'api/airportRequests';
import { getCompanies } from 'api/companyRequests';

const useStyles = makeStyles(() => ({}));

const AirportCreateDialogContent = ({ company, closeDialog }) => {
  const classes = useStyles();

  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [airportName, setAirportName] = useState('');
  const [airportCity, setAirportCity] = useState(null);
  const [airportCompany, setAirportCompany] = useState(null);

  const [isAirportNameValid, setIsAirportNameValid] = useState(true);
  const [isAirportCityValid, setIsAirportCityValid] = useState(true);

  const [isRequestError, setIsRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [citiesResponse, citiesError] = await getCities();
      if (citiesResponse) setCities(citiesResponse);

      const [companiesResponse, companiesError] = await getCompanies();
      if (companiesResponse) setCompanies(companiesResponse);
    };

    fetchData();
  }, []);

  const handleClearClick = () => {
    setAirportName('');
    setAirportCity(null);
    setAirportCompany(null);
  };

  const handleCreateClick = async () => {
    let isValid = true;
    setIsRequestError(false);
    setRequestErrorMessage('');

    if (!airportName) {
      setIsAirportNameValid(false);
      isValid = false;
    } else setIsAirportNameValid(true)
    if (!airportCity) {
      setIsAirportCityValid(false);
      isValid = false;
    } else setIsAirportCityValid(true)

    if (isValid) {
      const [createdAirport, airportError] = await postAirport({
        name: airportName,
        cityId: airportCity.id,
        companyId: company?.id || airportCompany.id,
      });

      if (airportError) {
        setIsRequestError(true);
        setRequestErrorMessage(airportError.response?.data?.message);
      } else {
        closeDialog();
      }
    }
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Airport name"
              variant="outlined"
              value={airportName}
              onChange={(event) => setAirportName(event.target.value)}
              error={!isAirportNameValid}
              helperText={!isAirportNameValid && 'This field is required'}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete 
              value={airportCity}
              onChange={(event, newValue) => setAirportCity(newValue)}
              options={cities}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label='City'
                  variant='outlined'
                  error={!isAirportCityValid}
                  helperText={!isAirportCityValid && 'This field is required'}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            {company ?
              <TextField 
                fullWidth 
                value={company.name}
                disabled
                label='Company'
                variant='outlined'
              /> :
              <Autocomplete 
                value={airportCompany}
                onChange={(event, newValue) => setAirportCompany(newValue)}
                options={companies}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => 
                  <TextField 
                    {...params}
                    label='Company'
                    variant='outlined'
                  />
                }
              />
            }
          </Grid>
          {isRequestError && 
            <Grid item>
              <Typography color='error'>{requestErrorMessage}</Typography>
            </Grid>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClearClick}>
          Clear
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </DialogActions>
    </>
  );
};

export default AirportCreateDialogContent;
