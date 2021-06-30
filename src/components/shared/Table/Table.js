import React from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  grid: {
    height: '500px',
    width: '100%',
  },
}));

const Table = ({ rows, columns, onPageChange, rowCount, onAddClick }) => {
  const classes = useStyles();

  function CustomHeader() {
    return (
      <div className={classes.tableHeader}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={onAddClick}
        >
          add new
        </Button>
      </div>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onPageChange={(page) => onPageChange(page.page)}
      rowCount={rowCount}
      pageSize={elementsOnAdminTable}
      paginationMode="server"
      checkboxSelection={false}
      disableColumnMenu={true}
      disableSelectionOnClick={true}
      className={classes.grid}
      components={{
        Header: CustomHeader,
      }}
    />
  );
};

export default Table;
