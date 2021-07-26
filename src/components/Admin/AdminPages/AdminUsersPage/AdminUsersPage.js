import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import UserCreateDialog from 'components/shared/Dialogs/UserCreateDialog/UserCreateDialog';
import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import { getFilteredUsers, getFilteredUsersCount } from 'api/apiRequests';
import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  usersGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
}));

const AdminUsersPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
  const [totalUsersNumber, setTotalUsersNumber] = useState(0);

  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [emailFilter, setEmailFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'roleId', headerName: 'Role ID', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 200 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const users = await getFilteredUsers(
        offset,
        emailFilter,
        firstNameFilter,
        lastNameFilter
      );
      const usersCount = await getFilteredUsersCount(
        emailFilter,
        firstNameFilter,
        lastNameFilter
      );

      setUsers(users);
      setTotalUsersNumber(usersCount);
    };

    fetchData();
  }, [token, offset, emailFilter, firstNameFilter, lastNameFilter, isCreateDialogOpened]);

  const onFilterConfirmed = (values) => {
    setEmailFilter(values[0]);
    setFirstNameFilter(values[1]);
    setLastNameFilter(values[2]);
    setOffset(0);
    setPage(0);
  };

  const onPageChange = (page) => {
    setPage(page);
    setOffset(page * elementsOnAdminTable);
  };

  const openCreateDialog = () => {
    setIsCreateDialogOpened(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpened(false);
  };

  return (
    <>
      <UserCreateDialog 
        isOpened={isCreateDialogOpened}
        closeDialog={closeCreateDialog}
      />
      <div className={classes.tableHeader}>
        <Typography variant="h3">Users</Typography>
        <Filter
          fields={['Email', 'First name', 'Last name']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <Table
        page={page}
        rows={users}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={totalUsersNumber}
        onAddClick={openCreateDialog}
      />
    </>
  );
};

export default AdminUsersPage;
