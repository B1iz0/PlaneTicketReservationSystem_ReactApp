import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import PlaceItem from './PlaceItem';
import BaggageRegistration from './BaggageRegistration';

const useStyles = makeStyles((theme) => ({
  placeSelectionPapper: {
    padding: theme.spacing(3),
  },
  placesSection: {
    display: 'inline',
  },
  placeButton: {
    margin: 2,
    height: 25,
    width: 25,
    minWidth: 0,
    padding: 0
  },
}));

const columns = [
  { field: 'placeType', headerName: 'Place type', flex: 1 },
  { field: 'row', headerName: 'Place row', flex: 1 },
  { field: 'column', headerName: 'Place column', flex: 1 },
  { 
    field: 'price', 
    headerName: 'Price', 
    flex: 1,
    valueFormatter: (params) => {
      return `${params.value} $`;
    }
  },
]

const PlaceSelectionStep = (
  { 
    selectedPlaces, 
    selectedFlight, 
    handlePlaceSelection, 
    handlePlaceRejection, 
    isBaggageServiceChecked, 
    handleBaggageChecked,
    handleBaggageWeightChange
  }) => {
  const classes = useStyles();

  const dataGridRows = selectedPlaces.map(value => {
    let ticketPrice;

    selectedFlight.airplane.prices.forEach(price => {
      if (price.placeType === value.placeType) {
        ticketPrice = price.ticketPrice;
      };
    });

    return {
      id: value.id,
      placeType: value.placeType,
      row: value.row,
      column: value.column,
      price: ticketPrice,
    }
  })

  return (
    <Paper className={classes.placeSelectionPapper}>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <Paper>
            <div className={classes.placesSection}>
              {selectedFlight.airplane.places.map(value => {
                return (
                  <>
                    <PlaceItem 
                      selectedPlaces={selectedPlaces}
                      key={value.id} 
                      place={value} 
                      handlePlaceSelection={handlePlaceSelection}
                      handlePlaceRejection={handlePlaceRejection}
                    />
                    {value.column === selectedFlight.airplane.columns - 1 ? <br/> : null}
                  </>
                )
              })}
            </div>
          </Paper>
        </Grid>
        <Grid item lg={8}>
          <DataGrid 
            rows={dataGridRows} 
            columns={columns} 
            disableColumnMenu
          />
        </Grid>
        <Grid item lg={9}>
          <BaggageRegistration 
            selectedFlight={selectedFlight}
            isBaggageServiceChecked={isBaggageServiceChecked}
            handleBaggageChecked={handleBaggageChecked}
            handleBaggageWeightChange={handleBaggageWeightChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlaceSelectionStep;