import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

import API from 'api';
import Table from 'components/shared/Table';
import { allUsersEndPoint } from 'constants';
import { getId, refreshCurrentToken } from 'services/token-service';

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
}));

const AccountPage = () => {
  const classes = useStyles();
  const token = useSelector(state => state.token);

  const [user, setUser] = useState();
  const [rows, setRows] = useState([])

  useEffect(() => {
    const getUserInfo = async () => {
      let userId = getId(token.jwtToken);

      await API.get(`${allUsersEndPoint}/${userId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token.jwtToken,
          },
        }
      )
        .then(response => response.data)
        .then(data => setUser(data))
        .catch(error => refreshCurrentToken(token.refreshToken));
    };

    getUserInfo();
  }, [token])

  useEffect(() => {
    let currentRows = user?.bookings.map(item => {
      return {
        id: item.id,
        flightNumber: item.flight.flightNumber,
        airplaneModel: item.flight.airplane.model,
        departureAirport: item.flight.from.name,
        arrivalAirport: item.flight.to.name,
        departureDate: item.flight.departureDate,
        arrivalDate: item.flight.arrivalDate,
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
    { field: 'departureDate', headerName: 'Departure date', width: 200 },
    { field: 'arrivalDate', headerName: 'Arrival date', width: 200 },
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
        <Typography variant="h4">
          My bookings
        </Typography>
        <Table
        rows={rows}
        columns={columns}
        // onPageChange={onPageChange}
        // rowCount={totalUsersNumber}
        // onAddClick={openCreateDialog}
        />
      </div>
    </>
  )
};

export default AccountPage;