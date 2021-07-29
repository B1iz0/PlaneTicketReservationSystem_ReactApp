import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getAirplaneTypes, addAirplane } from 'api/airplaneRequests';
import { getAllCompanies } from 'api/companyRequests';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: '100%',
  },
  airplaneCreationForm: {
    padding: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const AirplaneCreationStep = ({ handleNext, handleAirplaneCreation }) => {
  const classes = useStyles();

  const [airplaneTypeId, setAirplaneTypeId] = useState();
  const [companyId, setCompanyId] = useState();
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState();
  const [rowsAmount, setRowsAmount] = useState();
  const [columnsAmount, setColumnsAmount] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();

  const [airplaneType, setAirplaneType] = useState('');
  const [company, setCompany] = useState('');

  const [airplaneTypes, setAirplaneTypes] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [isModelValid, setIsModelValid] = useState(true);
  const [isRegistrationNumberValid, setIsRegistrationNumberValid] =
    useState(true);
  const [isAirplaneTypeValid, setIsAirplaneTypeValid] = useState(true);
  const [isRowsNumberValid, setIsRowsNumberValid] = useState(true);
  const [isColumnsNumberValid, setIsColumnsNumberValid] = useState(true);
  const [isBaggageCapacityValid, setIsBaggageCapacityValid] = useState(true);
  const [isCompanyValid, setIsCompanyValid] = useState(true);

  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const airplaneTypes = await getAirplaneTypes();
      const companies = await getAllCompanies();

      setAirplaneTypes(airplaneTypes);
      setCompanies(companies);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setServerError('');
    let isValid = true;
    if (!model) {
      setIsModelValid(false);
      isValid = false;
    } else setIsModelValid(true);
    if (!registrationNumber || registrationNumber.length > 7) {
      setIsRegistrationNumberValid(false);
      isValid = false;
    } else setIsRegistrationNumberValid(true);
    if (!airplaneTypeId) {
      setIsAirplaneTypeValid(false);
      isValid = false;
    } else setIsAirplaneTypeValid(true);
    if (!rowsAmount || parseInt(rowsAmount, 10) <= 0) {
      setIsRowsNumberValid(false);
      isValid = false;
    } else setIsRowsNumberValid(true);
    if (!columnsAmount || parseInt(columnsAmount, 10) <= 0) {
      setIsColumnsNumberValid(false);
      isValid = false;
    } else setIsColumnsNumberValid(true);
    if (!baggageCapacity || parseInt(baggageCapacity, 10) <= 0) {
      setIsBaggageCapacityValid(false);
      isValid = false;
    } else setIsBaggageCapacityValid(true);
    if (!companyId) {
      setIsCompanyValid(false);
      isValid = false;
    } else setIsCompanyValid(true);

    if (isValid) {
      const [createdAirplane, error] = await addAirplane(
        airplaneTypeId,
        companyId,
        model,
        registrationNumber,
        rowsAmount,
        columnsAmount,
        baggageCapacity
      );

      if (error) {
        setServerError(error.response?.data?.message);
      } else {
        handleAirplaneCreation(createdAirplane);
        handleNext();
      }
    }
  };

  return (
    <div>
      <form className={classes.airplaneCreationForm}>
        <Grid container direction="column" spacing={1}>
          <Grid item lg={12}>
            <TextField
              required
              className={classes.formField}
              error={!isModelValid}
              helperText={!isModelValid && "It's required field"}
              variant="outlined"
              label="Model"
              onChange={(e) => setModel(e.target.value)}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              required
              className={classes.formField}
              error={!isRegistrationNumberValid}
              helperText={
                !isRegistrationNumberValid &&
                "It's required field and containes less 7 symbols"
              }
              variant="outlined"
              label="Registration number"
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </Grid>
          <Grid item lg={12}>
            <FormControl
              className={classes.formField}
              error={!isAirplaneTypeValid}
              required
            >
              <InputLabel>Airplane type</InputLabel>
              <Select
                value={airplaneType}
                onChange={(event) => setAirplaneType(event.target.value)}
              >
                {airplaneTypes.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.typeName}
                    onClick={() => setAirplaneTypeId(item.id)}
                  >
                    {item.typeName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {!isAirplaneTypeValid && "It's required field"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item lg={6}>
              <TextField
                required
                className={classes.formField}
                type="number"
                error={!isRowsNumberValid}
                helperText={
                  !isRowsNumberValid &&
                  "It's required field (Only positive value)"
                }
                variant="outlined"
                label="Rows number"
                onChange={(e) => setRowsAmount(e.target.value)}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                required
                className={classes.formField}
                type="number"
                error={!isColumnsNumberValid}
                helperText={
                  !isColumnsNumberValid &&
                  "It's required field (Only positive value)"
                }
                variant="outlined"
                label="Places number in a row"
                onChange={(e) => setColumnsAmount(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <TextField
              required
              className={classes.formField}
              type="number"
              error={!isBaggageCapacityValid}
              helperText={
                !isBaggageCapacityValid &&
                "It's required field (Only positive value)"
              }
              variant="outlined"
              label="Baggage capacity"
              onChange={(e) => setBaggageCapacity(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={12}>
            <FormControl
              className={classes.formField}
              error={!isCompanyValid}
              required
            >
              <InputLabel>Company</InputLabel>
              <Select
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              >
                {companies.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    onClick={() => setCompanyId(item.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {!isCompanyValid && "It's required field"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={12}>
            <Typography variant="subtitle1" color="error">
              {serverError}
            </Typography>
          </Grid>
        </Grid>
      </form>
      <div className={classes.actionsContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.button}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AirplaneCreationStep;
