import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import UserCreateDialog from 'components/shared/Dialogs/UserCreateDialog/UserCreateDialog';
import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import { getFilteredUsers, getFilteredUsersCount } from 'api/apiRequests';
import { getUserSearchHints } from 'api/searchHintsRequests';
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
  let timer = null;
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
  const [totalUsersNumber, setTotalUsersNumber] = useState(0);

  const [emailHints, setEmailHints] = useState([]);
  const [firstNameHints, setFirstNameHints] = useState([]);
  const [lastNameHints, setLastNameHints] = useState([]);

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
    { field: 'roleName', headerName: 'Role', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 200 },
  ];

  const fetchUsers = async () => {
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

  const fetchHints = async () => {
    const hints = await getUserSearchHints({
      email: emailFilter,
      firstName: firstNameFilter,
      lastName: lastNameFilter,
    });
    const emails = hints.map(value => value.email);
    const firstNames = hints.map(value => value.firstName);
    const lastNames = hints.map(value => value.lastName);
    setEmailHints([...new Set(emails)]);
    setFirstNameHints([...new Set(firstNames)]);
    setLastNameHints([...new Set(lastNames)]);
  };

  useEffect(() => {
    fetchUsers();
  }, [token, offset, emailFilter, firstNameFilter, lastNameFilter, isCreateDialogOpened]);

  const onFilterChange = (values) => {
    clearTimeout(timer);
    if (!values[0] && !values[1] && !values[2]) {
      setEmailHints([]);
      setFirstNameHints([]);
      setLastNameHints([]);
    };
    if (values[0] || values[1] || values[2]) {
      timer = setTimeout(() => fetchHints(), 500);
    };
  };

  const onSearchClick = (values) => {
    setEmailFilter(values[0]);
    setFirstNameFilter(values[1]);
    setLastNameFilter(values[2]);
    setPage(0);
    setOffset(0);
  }

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
          fieldsOptions={[emailHints, firstNameHints, lastNameHints]}
          onFilterConfirmed={onFilterChange}
          onSearchClick={onSearchClick}
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
