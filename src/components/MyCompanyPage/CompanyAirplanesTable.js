import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  airportsTable: {
    minHeight: 400,
  },
}));

const columns = [
  { field: 'name', headerName: 'Airport name', width: 200 },
  { field: 'city', headerName: 'City', width: 200 },
  { field: 'country', headerName: 'Country', width: 200 },
];

const rows = [
  { id: 1, name: 'Snow', city: 'Jon', country: 35 },
  { id: 2, name: 'Snow', city: 'Jon', country: 35 },
  { id: 3, name: 'Snow', city: 'Jon', country: 35 },
  { id: 4, name: 'Snow', city: 'Jon', country: 35 },
  { id: 5, name: 'Snow', city: 'Jon', country: 35 },
];

const CompanyAirplanesTable = () => {
  const classes = useStyles();

  return (
    <DataGrid 
      className={classes.airportsTable}
      columns={columns}
      rows={rows}
      pageSize={5}
      checkboxSelection={false}
      disableColumnMenu
      disableSelectionOnClick
    />
  );
};

export default CompanyAirplanesTable;