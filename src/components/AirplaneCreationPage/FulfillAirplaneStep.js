import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

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

const FulfillAirplaneStep = ({ handleBackToAdminTable }) => {
  const classes = useStyles();

  const [placeTypes, setPlaceTypes] = useState([]);

  const handleFulfillAirplane = () => {

    handleBackToAdminTable();
  }

  const handleAddPlaceType = () => {
    const updatePlaceTypes = [
      ...placeTypes,
      '',
    ];

    setPlaceTypes(updatePlaceTypes);
  }

  console.log(placeTypes.length);

  return (
    <div>
      <Grid container spacing={2}>
        {
          placeTypes.map(() => {
            return (
              <Grid item container lg={12} spacing={1} justify="flex-end">
                <Grid item lg={6}>
                  <TextField 
                    className={classes.textField}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                    className={classes.textField}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                    className={classes.textField}
                    variant="outlined"
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