import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/Delete'; 
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import red from '@material-ui/core/colors/red';

import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import CustomDialog from 'components/shared/CustomDialog';
import { getFilteredCompanies, getCompaniesCount } from 'api/apiRequests';
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

  const [offset, setOffset] = useState(0);
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [countryNameFilter, setCountryNameFilter] = useState('');

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);
  const [isManagersDialogOpened, setIsManagersDialogOpened] = useState(false);

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
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="primary">
              <InfoOutlinedIcon />
            </IconButton>
            <IconButton 
              color="primary"
              onClick={() => setIsManagersDialogOpened(true)}
            >
              <SupervisorAccountIcon />
            </IconButton>
            <IconButton className={classes.deleteButton}>
              <DeleteIcon />
            </IconButton>
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
  }, [token, offset, companyNameFilter, countryNameFilter, isCreateDialogOpened]);

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

  const openCreateDialog = () => {
    setIsCreateDialogOpened(true);
  }

  const closeCreateDialog = () => {
    setIsCreateDialogOpened(false);
  }

  return (
    <>
    <CustomDialog 
        title="Managers"
        isOpened={isManagersDialogOpened}
        closeDialog={() => setIsManagersDialogOpened(false)}
        DialogContent={<CompanyManagersDialogContent />}
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
