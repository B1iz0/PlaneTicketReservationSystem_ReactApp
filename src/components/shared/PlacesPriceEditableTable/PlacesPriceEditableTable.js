import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { elementsOnAdminTable } from 'constants';

const PlacesPriceEditableTable = ({ prices, handleCellEdit }) => {
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
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={prices}
        columns={columns}
        pageSize={elementsOnAdminTable}
        disableColumnMenu
        onEditCellChange={(row) => handleCellEdit(row)}
      />
    </div>
  );
};

export default PlacesPriceEditableTable;