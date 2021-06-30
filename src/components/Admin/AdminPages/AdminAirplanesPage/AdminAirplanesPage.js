import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IconButton, Typography } from '@material-ui/core';

import { 
  getAirplanes,
  getAirplanesCount
} from 'api/apiRequests';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import Filter from 'components/Filter';
import {
  elementsOnAdminTable,
} from 'constants';

import AirplaneCreateDialogContent from './AirplaneCreateDialogContent';

const AdminAirplanesPage = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);

  const [offset, setOffset] = useState(0);

  const [airplaneTypeFilter, setAirplaneTypeFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isMoreInfoDialogOpened, setIsMoreInfoDialogOpened] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'airplaneType', headerName: 'Type', width: 150 },
    { field: 'companyName', headerName: 'Company', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    {
      field: 'registrationNumber',
      headerName: 'Registration number',
      width: 200,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: (row) => {
        return (
          <IconButton color="primary" onClick={() => openEditInfoDialog()}>
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: 'info',
      headerName: 'More info',
      renderCell: (row) => {
        return (
          <IconButton color="primary" onClick={() => openMoreInfoDialog()}>
            <InfoOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = airplanes.map((value) => {
    return {
      id: value.id,
      airplaneType: value.airplaneType.typeName,
      companyName: value.company.name,
      model: value.model,
      registrationNumber: value.registrationNumber,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const airplanes = await getAirplanes(offset, airplaneTypeFilter, companyFilter, modelFilter);
      const airplanesCount = await getAirplanesCount(airplaneTypeFilter, companyFilter, modelFilter);

      setAirplanes(airplanes);
      setAirplanesCount(airplanesCount);
    }

    fetchData();
  }, [airplaneTypeFilter, companyFilter, modelFilter, offset, isAddDialogOpened, isEditDialogOpened]);

  const onFilterConfirmed = (values) => {
    setAirplaneTypeFilter(values[0]);
    setCompanyFilter(values[1]);
    setModelFilter(values[2]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * elementsOnAdminTable);
  };

  const openMoreInfoDialog = () => {
    setIsMoreInfoDialogOpened(true);
  };

  const closeMoreInfoDialog = () => {
    setIsMoreInfoDialogOpened(false);
  };

  const openEditInfoDialog = () => {
    setIsEditDialogOpened(true);
  };

  const closeEditInfoDialog = () => {
    setIsEditDialogOpened(false);
  };

  const openAddDialog = () => {
    setIsAddDialogOpened(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpened(false);
  };

  return (
    <>
      <CustomDialog
        title="Add airplane"
        isOpened={isAddDialogOpened}
        closeDialog={closeAddDialog}
        DialogContent={<AirplaneCreateDialogContent closeDialog={closeAddDialog}/>}
      />
      <CustomDialog
        title="Edit"
        isOpened={isEditDialogOpened}
        closeDialog={closeEditInfoDialog}
      />
      <CustomDialog
        title="More info"
        isOpened={isMoreInfoDialogOpened}
        closeDialog={closeMoreInfoDialog}
      />
      <div>
        <Typography variant="h3">Airplanes</Typography>
        <Filter
          fields={['Airplane type', 'Company name', 'Airplane model']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <Table
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={airplanesCount}
        onAddClick={openAddDialog}
      />
    </>
  );
};

export default AdminAirplanesPage;
