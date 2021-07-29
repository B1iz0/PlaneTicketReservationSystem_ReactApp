import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { setIsSimpleSuccessNotificationActive, setSimpleSuccessNotificationText } from 'reduxStore/notificationsSlice';
import { getAirplanePlacePrices, putAirplanePrices } from 'api/priceRequests';
import PlacesPriceEditableTable from 'components/shared/PlacesPriceEditableTable';

const useStyles = makeStyles((theme) => ({
  pricesDialogContent: {
    minWidth: 400,
  },
  errorMessage: {
    padding: theme.spacing(1),
  },
}));

const PlacesPriceDialogContent = ({ airplane, closeDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [initialPrices, setInitialPrices] = useState([]);
  const [prices, setPrices] = useState([]);

  const [isPricesValid, setIsPricesValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const newPrices = await getAirplanePlacePrices(airplane?.id);

      setInitialPrices(newPrices.map(x => ({...x})));
      setPrices(newPrices.map(x => ({...x})));
    };

    fetchData();
  }, [airplane.id]);

  const handleCellEdit = (row) => {
    const newPrices = prices.map(x => ({...x}));
    for (let i = 0; i < newPrices.length; i++) {
      if (newPrices[i].id === row.id) {
        newPrices[i].ticketPrice = parseInt(row.props.value);
        break;
      }
    }
    setPrices(newPrices.map(x => ({...x})));
  };

  const handleSaveClick = async () => {
    let isValid = true;
    if (!isPricesValid) setIsPricesValid(true);

    prices.forEach(price => {
      if (price.ticketPrice <= 0) {
        isValid = false;
        setIsPricesValid(false);
      }
    });

    if (isValid) {
      const pricesForUpdate = prices.map((value) => {
        return {
          id: value.id,
          airplaneId: value.airplaneId,
          placeTypeId: value.placeTypeId,
          ticketPrice: parseInt(value.ticketPrice, 10),
        };
      });
  
      await putAirplanePrices(pricesForUpdate);
      dispatch(setIsSimpleSuccessNotificationActive(true));
      dispatch(setSimpleSuccessNotificationText('The prices were edited successfully!'));
      closeDialog();
    };
  };

  return (
    <>
      <DialogContent className={classes.pricesDialogContent}>
        <PlacesPriceEditableTable 
          prices={prices}
          handleCellEdit={handleCellEdit}
        />
        { !isPricesValid && 
          <Typography 
            variant='h6'
            color='error'
            className={classes.errorMessage}
          >
            Prices can be only positive numbers
          </Typography>
        }
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => setPrices(initialPrices.map(x => ({...x})))}
        >
          Reset
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default PlacesPriceDialogContent;