import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { getPlaceTypes } from 'api/apiRequests';

const filter = createFilterOptions();

const AirplaneTypesAutocomplete = ({ placeType, index, handleChange }) => {
  const [placeTypes, setPlaceTypes] = useState([]);

  const [selectedPlaceType, setSelectedPlaceType] = useState(placeType);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogValue, setDialogValue] = useState({
    placeTypeName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const placeTypes = await getPlaceTypes();

      setPlaceTypes(placeTypes);
    }

    fetchData();
  }, []);

  const handleClose = () => {
    setDialogValue({
      placeTypeName: '',
    });

    setIsDialogOpen(false);
  }

  const handleTypeSubmitCreation = (event) => {
    event.preventDefault();
    setSelectedPlaceType({
      name: dialogValue.placeTypeName,
    });
    handleChange(index, {
      name: dialogValue.placeTypeName,
    });

    handleClose();
  }

  return (
    <div>
      <Autocomplete 
        value={selectedPlaceType}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              setIsDialogOpen(true);
              setDialogValue({
                placeTypeName: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            setIsDialogOpen(true);
            setDialogValue({
              placeTypeName: newValue.inputValue,
            });
          } else {
            setSelectedPlaceType(newValue);
            handleChange(index, newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={placeTypes}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Place type" variant="outlined" />
        )}
      />
      <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleTypeSubmitCreation}>
          <DialogTitle id="form-dialog-title">Add a new place type</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did we miss any type in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.placeTypeName}
              onChange={(event) => setDialogValue({ ...dialogValue, placeTypeName: event.target.value })}
              label="Type name"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AirplaneTypesAutocomplete;