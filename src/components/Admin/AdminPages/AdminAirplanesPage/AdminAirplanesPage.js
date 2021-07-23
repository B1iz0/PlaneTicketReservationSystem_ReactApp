import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';

import {
  getAirplanes,
  deleteAirplane,
  getAirplanesCount,
} from 'api/apiRequests';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import DeleteConfirmDialog from 'components/shared/DeleteConfirmDialog';
import Filter from 'components/Filter';
import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: red[500],
  },
}));

const AdminAirplanesPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);
  const [airplaneIdToDelete, setAirplaneIdToDelete] = useState();

  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);

  const [airplaneTypeFilter, setAirplaneTypeFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isMoreInfoDialogOpened, setIsMoreInfoDialogOpened] = useState(false);
  const [isDeleteConfirmDialogOpened, setIsDeleteConfirmDialogOpened] =
    useState(false);

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
      field: 'baggageCapacity',
      headerName: 'Baggage capacity',
      width: 200,
      type: 'number',
      valueFormatter: (params) => {
        return `${params.value} Kg`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (row) => {
        return (
          <>
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => openEditInfoDialog()}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="More info">
              <IconButton color="primary" onClick={() => openMoreInfoDialog()}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                className={classes.deleteButton}
                onClick={() => openDeleteConfirmDialog(row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
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
      baggageCapacity: value.baggageCapacityInKilograms,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const airplanes = await getAirplanes(
        offset,
        airplaneTypeFilter,
        companyFilter,
        modelFilter
      );
      const airplanesCount = await getAirplanesCount(
        airplaneTypeFilter,
        companyFilter,
        modelFilter
      );

      setAirplanes(airplanes);
      setAirplanesCount(airplanesCount);
    };

    fetchData();
  }, [
    airplaneTypeFilter,
    companyFilter,
    modelFilter,
    offset,
    isDeleteConfirmDialogOpened,
    isEditDialogOpened,
  ]);

  const onFilterConfirmed = (values) => {
    setAirplaneTypeFilter(values[0]);
    setCompanyFilter(values[1]);
    setModelFilter(values[2]);
    setOffset(0);
    setPage(0);
  };

  const onPageChange = (page) => {
    setPage(page);
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

  const openDeleteConfirmDialog = (airplaneId) => {
    setAirplaneIdToDelete(airplaneId);
    setIsDeleteConfirmDialogOpened(true);
  };

  const handleDeleteRejection = () => {
    setIsDeleteConfirmDialogOpened(false);
  };

  const handleDeleteConfirmation = async () => {
    await deleteAirplane(airplaneIdToDelete);
    setIsDeleteConfirmDialogOpened(false);
  };

  const openAddPage = () => {
    history.push('/admin/airplanes/creation');
  };

  return (
    <>
      <DeleteConfirmDialog
        isOpened={isDeleteConfirmDialogOpened}
        handleConfirmation={handleDeleteConfirmation}
        handleRejection={handleDeleteRejection}
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
        page={page}
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={airplanesCount}
        onAddClick={openAddPage}
      />
    </>
  );
};

export default AdminAirplanesPage;
