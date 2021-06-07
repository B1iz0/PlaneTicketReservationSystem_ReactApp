import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Filter from "components/Filter";
import { refreshCurrentToken } from "services/token-service";
import API from "api";
import {
    allUsersEndPoint,
    allUsersCountEndPoint,
    usersOnAdminTable
} from "constants";

const useStyles = makeStyles((theme) => ({
  usersGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const AdminUsersPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [ users, setUsers ] = useState([]);
  const [ totalUsersNumber, setTotalUsersNumber ] = useState(0);

  const [ offset, setOffset ] = useState(0);
  const [ limit, setLimit ] = useState(usersOnAdminTable);
  const [ emailFilter, setEmailFilter ] = useState('');
  const [ firstNameFilter, setFirstNameFilter ] = useState('');
  const [ lastNameFilter, setLastNameFilter ] = useState('');

  const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'firstName', headerName: 'First name', width: 150 },
      { field: 'lastName', headerName: 'Last name', width: 150 },
      { field: 'roleId', headerName: 'Role ID', width: 150 },
      { field: 'phoneNumber', headerName: 'Phone number', width: 200 }
  ]

  useEffect(() => {
      const getUsers = async () => {
          await API.get(`${allUsersEndPoint}`, {
            params: {
              offset: offset,
              limit: limit,
              email: emailFilter,
              firstName: firstNameFilter,
              lastName: lastNameFilter
            },
            headers: {
              Authorization: "Bearer " + token.jwtToken,
            },
          })
            .then((response) => response.data)
            .then((data) => setUsers(data))
            .catch((error) => {
              refreshCurrentToken(token.refreshToken);
              if (error.response) {
                console.log(error.response.data);
              };
          });
      };
      const getUsersCount = async () => {
        await API.get(`${allUsersCountEndPoint}`, {
          params: {
            email: emailFilter,
            firstName: firstNameFilter,
            lastName: lastNameFilter
          },
          headers: {
            Authorization: "Bearer " + token.jwtToken,
          },
        })
          .then((response) => response.data)
          .then((data) => setTotalUsersNumber(data))
          .catch((error) => {
            refreshCurrentToken(token.refreshToken);
            if (error.response) {
              console.log(error.response.data);
            };
        });
    };

      getUsers();
      getUsersCount();
  }, [offset]);

  const onFilterConfirmed = (values) => {
    setEmailFilter(values[0]);
    setFirstNameFilter(values[1]);
    setLastNameFilter(values[2]);
  }

  const onPageChange = (page) => {
    setOffset(page * limit);
  }

  return(
    <div>
      <div className={classes.tableHeader}>
        <Typography variant="h3">Users</Typography>
        <Filter 
          fields={['Email', 'First name', 'Last name']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}/>
      </div>
      <DataGrid columns={columns} rows={users} onPageChange={(page) => onPageChange(page.page)} paginationMode='server' pageSize={limit} rowCount={totalUsersNumber} checkboxSelection={false} disableColumnMenu={true} className={classes.usersGrid}/>
    </div>
  );
};

export default AdminUsersPage;