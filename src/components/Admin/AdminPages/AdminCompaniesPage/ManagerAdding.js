import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  managerAdding: {
    padding: theme.spacing(2),
  },
}));

const ManagerAdding = ({ freeUsers, handleAddManager }) => {
  const classes = useStyles();
  const [newManager, setNewManager] = useState(null);

  const [isNewManagerValid, setIsNewManagerValid] = useState(true);

  const onAddClick = () => {
    let isValid = true;
    if (!isNewManagerValid) setIsNewManagerValid(true);

    if (!newManager) {
      isValid = false;
      setIsNewManagerValid(false);
    };

    if (isValid) {
      setNewManager(null);
      handleAddManager(newManager);
    }
  };

  return (
    <div className={classes.managerAdding}>
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item xs={6}>
          <Autocomplete
            options={freeUsers}
            value={newManager}
            onChange={(event, newValue) => {
              setNewManager(newValue);
            }}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => 
              <TextField 
                error={!isNewManagerValid}
                {...params} 
                label="Combo box" 
                variant="outlined" 
              />
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant='contained'
            color='primary'
            onClick={onAddClick}
            startIcon={<PersonAddIcon />}
          >
            Add new manager
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManagerAdding;