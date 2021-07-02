import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import AirplaneTypesAutocomplete from './AirplaneTypesAutocomplete';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
}));

const FulfillAirplaneStep = ({ airplaneId, handleBackToAdminTable }) => {
  const classes = useStyles();

  const [placeTypes, setPlaceTypes] = useState([]);

  const handleFulfillAirplane = () => {

    handleBackToAdminTable();
  }

  const handleAddPlaceType = (newValue) => {
    const updatePlaceTypes = [
      ...placeTypes,
      null,
    ];

    setPlaceTypes(updatePlaceTypes);
  }

  const handleChangeSomePlaceType = (key, newValue) => {
    const updatePlaceTypes = [ ...placeTypes ];
    updatePlaceTypes[key] = newValue;

    setPlaceTypes(updatePlaceTypes);
  }

  const handleChangeAmountOfPlaces = (key, newValue) => {
    const updatePlaceTypes = [ ...placeTypes ];
    updatePlaceTypes[key].amount = newValue;

    setPlaceTypes(updatePlaceTypes);
  }

  return (
    <div>
      <Grid container spacing={2}>
        {
          placeTypes.map((value, key) => {
            return (
              <Grid key={key} item container lg={12} spacing={1}>
                <Grid item lg={6}>
                  <AirplaneTypesAutocomplete 
                    placeType={value}
                    index={key}
                    handleChange={handleChangeSomePlaceType}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                    className={classes.textField}
                    onChange={(event) => handleChangeAmountOfPlaces(key, event.target.value)}
                    variant="outlined"
                    label="Amount of such places"
                    type="number"
                  />
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
      <Button
        variant="outlined"
        onClick={handleAddPlaceType}
        startIcon={<AddIcon />}
      >
        Add new place type
      </Button>
      <div className={classes.actionsContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFulfillAirplane}
            className={classes.button}
          >
            Fulfill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FulfillAirplaneStep;