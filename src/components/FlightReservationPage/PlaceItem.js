import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { getId } from 'services/token-service';

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
  const token = useSelector((state) => state.token);
  const userId = getId(token.jwtToken);

  const [selectedPlace, setSelectedPlace] = useState(() => {
    let isSelected = false;
    
    selectedPlaces.forEach(selectedPlace => {
      if (selectedPlace.id === place.id) {
        isSelected = true;
      }
    });

    if (!place.isFree) {
      isSelected = true;
    }

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
    <>
      {
        (!place.isFree) && (!place.lastBlockedByUserId || (place.lastBlockedByUserId !== userId)) ? 
        <IconButton
          disabled
          className={classes.placeButton}
        >
          <CloseIcon />
        </IconButton> :
        <Button 
          variant="contained" 
          color={!selectedPlace.isSelected ? 'primary' : 'default'}
          key={place.id} 
          className={classes.placeButton}
          onClick={handlePlaceClick}
        />
      }
    </>
  );
};

export default PlaceItem;