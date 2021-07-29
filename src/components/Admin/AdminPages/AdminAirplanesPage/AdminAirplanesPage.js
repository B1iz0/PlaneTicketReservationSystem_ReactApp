import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';

import {
  getAirplanes,
  deleteAirplane,
  getAirplanesCount,
} from 'api/airplaneRequests';
import { getAirplaneSearchHints } from 'api/searchHintsRequests';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import DeleteConfirmDialog from 'components/shared/DeleteConfirmDialog';
import Filter from 'shared/Filter';
import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: red[500],
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
}));

const AdminAirplanesPage = () => {
  const classes = useStyles();
  let timer = null;
  let history = useHistory();
  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);
  const [airplaneIdToDelete, setAirplaneIdToDelete] = useState();

  const [airplaneTypeHints, setAirplaneTypeHints] = useState([]);
  const [companyNameHints, setCompanyNameHints] = useState([]);
  const [modelHints, setModelHints] = useState([]);

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

  const fetchAirplanes = async () => {
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

  const fetchHints = async () => {
    const hints = await getAirplaneSearchHints({
      airplaneType: airplaneTypeFilter,
      companyName: companyFilter,
      model: modelFilter,
    });
    const airplaneTypes = hints.map((value) => value.airplaneType);
    const companyNames = hints.map((value) => value.companyName);
    const models = hints.map((value) => value.model);
    setAirplaneTypeHints([...new Set(airplaneTypes)]);
    setCompanyNameHints([...new Set(companyNames)]);
    setModelHints([...new Set(models)]);
  };

  useEffect(() => {
    fetchAirplanes();
  }, [
    offset,
    airplaneTypeFilter,
    companyFilter,
    modelFilter,
    isDeleteConfirmDialogOpened,
    isEditDialogOpened,
  ]);

  const onFilterChange = (values) => {
    clearTimeout(timer);
    if (!values[0] && !values[1] && !values[2]) {
      setAirplaneTypeHints([]);
      setCompanyNameHints([]);
      setModelHints([]);
    }
    if (values[0] || values[1] || values[2]) {
      timer = setTimeout(() => fetchHints(), 500);
    }
  };

  const onSearchClick = (values) => {
    setAirplaneTypeFilter(values[0]);
    setCompanyFilter(values[1]);
    setModelFilter(values[2]);
    setPage(0);
    setOffset(0);
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
      <div className={classes.tableHeader}>
        <Typography variant="h3">Airplanes</Typography>
        <Filter
          fields={['Airplane type', 'Company name', 'Airplane model']}
          fieldsOptions={[airplaneTypeHints, companyNameHints, modelHints]}
          onFilterConfirmed={onFilterChange}
          onSearchClick={onSearchClick}
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
