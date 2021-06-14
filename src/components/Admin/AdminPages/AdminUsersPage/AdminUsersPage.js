import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CustomDialog from 'components/shared/CustomDialog';
import Filter from 'components/Filter';
import Table from 'components/shared/Table';
import { refreshCurrentToken } from 'services/token-service';
import API from 'api';
import {
  allUsersEndPoint,
  allUsersCountEndPoint,
  elementsOnAdminTable,
} from 'constants';
import { Flight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  usersGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const AdminUsersPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
  const [totalUsersNumber, setTotalUsersNumber] = useState(0);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(elementsOnAdminTable);
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
    const getUsers = async () => {
      await API.get(`${allUsersEndPoint}`, {
        params: {
          offset: offset,
          limit: limit,
          email: emailFilter,
          firstName: firstNameFilter,
          lastName: lastNameFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setUsers(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };
    const getUsersCount = async () => {
      await API.get(`${allUsersCountEndPoint}`, {
        params: {
          email: emailFilter,
          firstName: firstNameFilter,
          lastName: lastNameFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setTotalUsersNumber(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    };

    getUsers();
    getUsersCount();
  }, [offset, limit, emailFilter, firstNameFilter, lastNameFilter]);

  const onFilterConfirmed = (values) => {
    setEmailFilter(values[0]);
    setFirstNameFilter(values[1]);
    setLastNameFilter(values[2]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * limit);
  };

  const openCreateDialog = () => {
    setIsCreateDialogOpened(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpened(false);
  };

  return (
    <>
      <CustomDialog
        title="Add user"
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
