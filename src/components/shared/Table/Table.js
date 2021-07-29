import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';

import { elementsOnAdminTable } from 'constants';
import CustomFooter from './CustomFooter';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  grid: {
    minHeight: 400,
    width: '100%',
  },
}));

const Table = ({ page, rows, columns, onPageChange, rowCount, onAddClick }) => {
  const classes = useStyles();

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      pageSize={elementsOnAdminTable}
      checkboxSelection={false}
      disableColumnMenu={true}
      disableSelectionOnClick={true}
      className={classes.grid}
      components={{
        Footer: () => {
          return (
            <CustomFooter
              onAddClick={onAddClick}
              rowCount={rowCount}
              page={page}
              onPageChange={handlePageChange}
            />
          );
        },
      }}
    />
  );
};

export default Table;
