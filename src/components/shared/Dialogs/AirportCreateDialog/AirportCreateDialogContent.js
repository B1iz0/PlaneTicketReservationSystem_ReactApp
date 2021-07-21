import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({

}));

const AirportCreateDialogContent = () => {
  const classes = useStyles();
  const [airportName, setAirportName] = useState('');

  useEffect(() => {
    const fetchData = async () => {

    };

    fetchData();
  }, []);

  const handleClearClick = () => {

  };

  const handleCreateClick = async () => {
    
  };

  return (
    <>
      <DialogContent>
        <Grid container>
          <Grid item>
            <TextField 
              label='Airport name'
              variant='outlined'
              value={airportName}
              onChange={(event) => setAirportName(event.target.value)}
            />
          </Grid>
          <Grid item>
            
          </Grid>
          <Grid item>
            
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={handleClearClick}
        >
          Clear 
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleCreateClick}
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
};

export default AirportCreateDialogContent;