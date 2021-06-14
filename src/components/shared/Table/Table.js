import React from 'react';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
  },
  grid: {
    height: '500px',
    width: '100%',
  },
}));

function CustomPagination() {
  const classes = useStyles();
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <TablePagination
      className={classes.pagination}
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const Table = ({ rows, columns, onPageChange, rowCount }) => {
  const classes = useStyles();

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
    />
  );
};

export default Table;
