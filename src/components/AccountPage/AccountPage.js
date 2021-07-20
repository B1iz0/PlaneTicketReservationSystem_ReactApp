import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import Table from 'components/shared/Table';
import { elementsOnAdminTable } from 'constants';
import { getUserInfo } from 'api/apiRequests';

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  userEmail: {
    alignSelf: 'flex-end',
  },
  userEmailText: {
    fontSize: 'large',
  },
  userName: {
    alignSelf: 'flex-start',
  },
  userNameText: {
    fontSize: 'large',
  },
  bookingsTable: {
    minHeight: 400,
  },
}));

const AccountPage = () => {
  const classes = useStyles();

  const [user, setUser] = useState();
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function fetchData() {
      const user = await getUserInfo();
      setUser(user);
    }

    fetchData();
  }, [])

  useEffect(() => {
    let currentRows = user?.bookings.map(item => {
      return {
        id: item.id,
        flightNumber: item.flight.flightNumber,
        airplaneModel: item.flight.airplane.model,
        departureAirport: item.flight.from.name,
        arrivalAirport: item.flight.to.name,
        departureTime: item.flight.departureTime,
        arrivalTime: item.flight.arrivalTime,
      }
    })

    setRows(() => {
      if (currentRows) {
        return currentRows;
      } else {
        return []
      };
    });

  }, [user])

  const columns = [
    { field: 'flightNumber', headerName: 'Flight Number', width: 150 },
    { field: 'airplaneModel', headerName: 'Airplane model', width: 200 },
    { field: 'departureAirport', headerName: 'Departure airport', width: 200 },
    { field: 'arrivalAirport', headerName: 'Arrival airport', width: 200 },
    { field: 'departureTime', headerName: 'Departure time', width: 200 },
    { field: 'arrivalTime', headerName: 'Arrival time', width: 200 },
  ];
  
  return(
    <>
      <Typography gutterBottom variant="h2">
        My profile
      </Typography>
      <div>
        <Grid container justify="center">
          <Grid item lg={2}>
            <Avatar alt={user?.lastName} className={classes.largeAvatar}/>
          </Grid>
          <Grid item lg={6} container>
            <Grid item lg={12} className={classes.userEmail}>
              <Typography variant="overline" className={classes.userEmailText}>
                {user?.email}
              </Typography>
            </Grid>
            <Grid item lg={12} className={classes.userName}>
            <Typography variant="overline" className={classes.userNameText}>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant="h4" gutterBottom>
          My bookings
        </Typography>
        <DataGrid 
          className={classes.bookingsTable}
          columns={columns}
          rows={rows}
          pageSize={elementsOnAdminTable}
          checkboxSelection={false}
          disableColumnMenu
          disableSelectionOnClick
        />
      </div>
    </>
  )
};

export default AccountPage;