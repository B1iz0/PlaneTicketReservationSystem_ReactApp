import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/Delete'; 
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';

import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import DeleteConfirmDialog from 'components/shared/DeleteConfirmDialog';
import { 
  getFilteredCompanies, 
  getCompaniesCount,
  deleteCompany 
} from 'api/apiRequests';
import {
  elementsOnAdminTable,
} from 'constants';

import CompanyCreateDialogContent from './CompanyCreateDialogContent';
import CompanyManagersDialogContent from './CompanyManagersDialogContent';

const useStyles = makeStyles((theme) => ({
  companiesGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: red[500],
  },
}));

const AdminCompaniesPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [companies, setCompanies] = useState([]);
  const [totalCompaniesNumber, setTotalCompaniesNumber] = useState(0);

  const [companyIdToDelete, setCompanyIdToDelete] = useState('');

  const [offset, setOffset] = useState(0);
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [countryNameFilter, setCountryNameFilter] = useState('');

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);
  const [isManagersDialogOpened, setIsManagersDialogOpened] = useState(false);
  const [isDeleteConfirmDialogOpened, setIsDeleteConfirmDialogOpened] = useState(false);

  const [companyId, setCompanyId] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Company name', width: 200 },
    { field: 'countryName', headerName: 'Country name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (row) => {
        return (
          <>
            <Tooltip title='Edit'>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='More info'>
              <IconButton color="primary">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Show managers'>
              <IconButton 
                color="primary"
                onClick={() => openManagersDialog(row.id)}
              >
                <SupervisorAccountIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
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

  const rows = companies.map((value) => {
    return {
      id: value.id,
      name: value.name,
      countryName: value.country.name,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getFilteredCompanies(offset, companyNameFilter, countryNameFilter);
      const companiesCount = await getCompaniesCount(companyNameFilter, countryNameFilter);

      setCompanies(companies);
      setTotalCompaniesNumber(companiesCount);
    }

    fetchData();
  }, [token, offset, companyNameFilter, countryNameFilter, isCreateDialogOpened, isDeleteConfirmDialogOpened]);

  const onFilterConfirmed = (values) => {
    setCompanyNameFilter(values[0]);
    setCountryNameFilter(values[1]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * elementsOnAdminTable);
  };

  const handleAddClick = () => {
    setIsCreateDialogOpened(true);
  }

  const closeCreateDialog = () => {
    setIsCreateDialogOpened(false);
  }

  const openManagersDialog = (id) => {
    setCompanyId(id);
    setIsManagersDialogOpened(true);
  }

  const openDeleteConfirmDialog = (companyId) => {
    setCompanyIdToDelete(companyId);
    setIsDeleteConfirmDialogOpened(true);
  };

  const handleDeleteRejection = () => {
    setIsDeleteConfirmDialogOpened(false);
  }

  const handleDeleteConfirmation = async () => {
    await deleteCompany(companyIdToDelete);
    setIsDeleteConfirmDialogOpened(false);
  }

  return (
    <>
      <DeleteConfirmDialog 
        isOpened={isDeleteConfirmDialogOpened}
        handleConfirmation={handleDeleteConfirmation}
        handleRejection={handleDeleteRejection}
      />
      <CustomDialog 
        fullWidth={true}
        maxWidth='md'
        title="Managers"
        isOpened={isManagersDialogOpened}
        closeDialog={() => setIsManagersDialogOpened(false)}
        DialogContent={<CompanyManagersDialogContent companyId={companyId}/>}
      />
      <CustomDialog 
        title="Company registration"
        isOpened={isCreateDialogOpened}
        closeDialog={closeCreateDialog}
        DialogContent={<CompanyCreateDialogContent closeDialog={closeCreateDialog}/>}
      />
      <div className={classes.tableHeader}>
        <Typography variant="h3">Companies</Typography>
        <Filter
          fields={['Company name', 'Country']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <Table 
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={totalCompaniesNumber}
        onAddClick={handleAddClick}
      />
    </>
  );
};
export default AdminCompaniesPage;
