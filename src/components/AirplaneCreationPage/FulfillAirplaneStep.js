import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import AirplaneTypesAutocomplete from './AirplaneTypesAutocomplete';
import { postPlacesList } from 'api/apiRequests';

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

const FulfillAirplaneStep = ({ airplaneId, handleNext }) => {
  const classes = useStyles();

  const [placeTypes, setPlaceTypes] = useState([]);

  const handleFulfillAirplane = async () => {
    let isValid = true;
    const newPlaceTypes = [ ...placeTypes ];
    newPlaceTypes.forEach((placeType, index) => {
      if (!placeType) {
        console.log('hehe');
        placeType = {
          isTypeValid: false,
          isAmountValid: false,
        };
        isValid = false;
      }
      if (isValid) {
        if (!placeType.name) {
          placeType.isTypeValid = false;
          isValid = false;
        } else {
          placeType.isTypeValid = true;
        }
        if (!placeType.amount || parseInt(placeType.amount, 10) < 0) {
          placeType.isAmountValid = false;
          isValid = false;
        } else {
          placeType.isAmountValid = true;
        }
      }
      newPlaceTypes[index] = placeType;
    });

    setPlaceTypes(newPlaceTypes);
    
    if (isValid) {
      const requestPlaces = placeTypes.map(value => {
        return {
          placeTypeId: value.id,
          placeTypeName: value.name,
          placeAmount: parseInt(value.amount, 10),
        };
      });
      
      await postPlacesList({
        airplaneId: airplaneId,
        places: requestPlaces,
      });
      
      handleNext();
    }
  }

  const handleAddPlaceType = (newValue) => {
    const updatePlaceTypes = [
      ...placeTypes,
      {
        id: '',
        name: '',
        amount: '',
        isTypeValid: true,
        isAmountValid: true,
      },
    ];

    setPlaceTypes(updatePlaceTypes);
  }

  const handleChangeSomePlaceType = (key, newValue) => {
    console.log(newValue);
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
                    required
                    error={ value ? !value.isAmountValid : false }
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