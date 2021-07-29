import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';

import Filter from 'shared/Filter';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import DeleteConfirmDialog from 'components/shared/DeleteConfirmDialog';
import {
  getFilteredCompanies,
  getCompaniesCount,
  deleteCompany,
} from 'api/companyRequests';
import { getCompanySearchHints } from 'api/searchHintsRequests';
import { elementsOnAdminTable } from 'constants';

import CompanyEditDialogContent from './CompanyEditDialogContent';
import CompanyCreateDialogContent from './CompanyCreateDialogContent';
import CompanyManagersDialogContent from './CompanyManagersDialogContent';
import { filter } from 'lodash';

const useStyles = makeStyles((theme) => ({
  companiesGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  deleteButton: {
    color: red[500],
  },
}));

const AdminCompaniesPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  let timer = null;

  const [companyHints, setCompanyHints] = useState([]);
  const [countryHints, setCountryHints] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [totalCompaniesNumber, setTotalCompaniesNumber] = useState(0);

  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [countryNameFilter, setCountryNameFilter] = useState('');

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isManagersDialogOpened, setIsManagersDialogOpened] = useState(false);
  const [isDeleteConfirmDialogOpened, setIsDeleteConfirmDialogOpened] =
    useState(false);

  const [companyId, setCompanyId] = useState('');
  const [companyForEditing, setCompanyForEditing] = useState(null);

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
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => openEditDialog(row.row)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Show managers">
              <IconButton
                color="primary"
                onClick={() => openManagersDialog(row.id)}
              >
                <SupervisorAccountIcon />
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

  const rows = companies.map((value) => {
    return {
      id: value.id,
      name: value.name,
      countryName: value.country.name,
      country: value.country,
    };
  });

  const fetchCompanies = async () => {
    const companies = await getFilteredCompanies(
      offset,
      companyNameFilter,
      countryNameFilter
    );
    const companiesCount = await getCompaniesCount(
      companyNameFilter,
      countryNameFilter
    );

    setCompanies(companies);
    setTotalCompaniesNumber(companiesCount);
  }

  const fetchHints = async () => {
    const hints = await getCompanySearchHints({
      companyName: companyNameFilter,
      countryName: countryNameFilter,
    });
    const companies = hints.map(value => value.companyName);
    const countries = hints.map(value => value.countryName);
    setCompanyHints([...new Set(companies)]);
    setCountryHints([...new Set(countries)]);
  };

  useEffect(() => {
    fetchCompanies();
  }, [
    token,
    offset,
    companyNameFilter, 
    countryNameFilter,
    isEditDialogOpened,
    isCreateDialogOpened,
    isDeleteConfirmDialogOpened,
  ]);

  const onFilterChange = (values) => {
    clearTimeout(timer);
    if (!values[0] && !values[1]) {
      setCompanyHints([]);
      setCountryHints([]);
    };
    if (values[0] || values[1]) {
      timer = setTimeout(() => fetchHints(), 500);
    };
  };

  const onSearchClick = (values) => {
    setCompanyNameFilter(values[0]);
    setCountryNameFilter(values[1]);
    setPage(0);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setPage(page);
    setOffset(page * elementsOnAdminTable);
  };

  const handleAddClick = () => {
    setIsCreateDialogOpened(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpened(false);
  };

  const openManagersDialog = (id) => {
    setCompanyId(id);
    setIsManagersDialogOpened(true);
  };

  const openEditDialog = (company) => {
    setCompanyForEditing(company);
    setIsEditDialogOpened(true);
  };

  const openDeleteConfirmDialog = (companyId) => {
    setCompanyId(companyId);
    setIsDeleteConfirmDialogOpened(true);
  };

  const handleDeleteRejection = () => {
    setIsDeleteConfirmDialogOpened(false);
  };

  const handleDeleteConfirmation = async () => {
    await deleteCompany(companyId);
    setIsDeleteConfirmDialogOpened(false);
  };

  return (
    <>
      <DeleteConfirmDialog
        isOpened={isDeleteConfirmDialogOpened}
        handleConfirmation={handleDeleteConfirmation}
        handleRejection={handleDeleteRejection}
      />
      <CustomDialog
        title="Edit company"
        isOpened={isEditDialogOpened}
        closeDialog={() => setIsEditDialogOpened(false)}
        DialogContent={
          <CompanyEditDialogContent
            company={companyForEditing}
            closeDialog={() => setIsEditDialogOpened(false)}
          />
        }
      />
      <CustomDialog
        fullWidth={true}
        maxWidth="md"
        title="Managers"
        isOpened={isManagersDialogOpened}
        closeDialog={() => setIsManagersDialogOpened(false)}
        DialogContent={<CompanyManagersDialogContent companyId={companyId} />}
      />
      <CustomDialog
        title="Company registration"
        isOpened={isCreateDialogOpened}
        closeDialog={closeCreateDialog}
        DialogContent={
          <CompanyCreateDialogContent closeDialog={closeCreateDialog} />
        }
      />
      <div className={classes.tableHeader}>
        <Typography variant="h3">Companies</Typography>
        <Filter
          fields={['Company name', 'Country']}
          fieldsOptions={[companyHints, countryHints]}
          onFilterConfirmed={onFilterChange}
          onSearchClick={onSearchClick}
        />
      </div>
      <Table
        page={page}
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
