import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  placeButton: {
    margin: 2,
    height: 25,
    width: 25,
    minWidth: 0,
    padding: 0
  }
}));

const PlaceItem = ({ selectedPlaces, place, handlePlaceSelection, handlePlaceRejection }) => {
  const classes = useStyles();

  const [selectedPlace, setSelectedPlace] = useState(() => {
    let isSelected = false;
    
    selectedPlaces.forEach(selectedPlace => {
      if (selectedPlace.id === place.id) {
        isSelected = true;
      }
    });

    return {
      ...place,
      isSelected: isSelected,
    }
  });

  const handlePlaceClick = () => {
    if (selectedPlace.isSelected) {
      setSelectedPlace({
        ...selectedPlace,
        isSelected: false,
      });
      handlePlaceRejection(place);
    } else {
      setSelectedPlace({
        ...selectedPlace,
        isSelected: true,
      });
      handlePlaceSelection(place);
    };
  };

  return (
    <Button 
      variant="contained" 
      color={!selectedPlace.isSelected ? 'primary' : 'default'}
      disabled={!place.isFree}
      key={place.id} 
      className={classes.placeButton}
      onClick={handlePlaceClick}
      startIcon={!place.isFree ? <CloseIcon /> : null}
    />
  );
};

export default PlaceItem;