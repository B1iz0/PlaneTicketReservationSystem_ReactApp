import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

import { getAirplanePlacePrices, putAirplanePrices } from 'api/apiRequests';

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

const columns = [
  { field: 'placeType', headerName: 'Place type', flex: 1 },
  { 
    field: 'ticketPrice', 
    headerName: 'Price', 
    flex: 1,
    type: 'number',
    editable: true,
    valueFormatter: (params) => {
      return `${params.value} $`;
    }
  },
];

const PricesCreationStep = ({ airplaneId, handleBackToAdminTable }) => {
  const classes = useStyles();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newPrices = await getAirplanePlacePrices(airplaneId);
      console.log(newPrices);

      setPrices(newPrices);
    }

    fetchData();
  }, [airplaneId]);

  const handleCellEdit = (row) => {
    const newPrices = prices;
    for (let i = 0; i < newPrices.length; i++){
      if (newPrices[i].id === row.id){
        newPrices[i].ticketPrice = row.props.value;
        break;
      }
    }

    setPrices(newPrices);
  }

  const handlePricesSave = async () => {
    const pricesForUpdate = prices.map(value => {
      return {
        id: value.id,
        airplaneId: value.airplaneId,
        placeTypeId: value.placeTypeId,
        ticketPrice: parseInt(value.ticketPrice, 10),
      };
    });

    await putAirplanePrices(pricesForUpdate);
    handleBackToAdminTable();
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={prices} 
        columns={columns} 
        pageSize={5} 
        disableColumnMenu
        onEditCellChange={handleCellEdit}
      />
      <div className={classes.actionsContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePricesSave}
            className={classes.button}
          >
            Save prices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricesCreationStep;