import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import { useSelector } from 'react-redux';

import { getEmail, getRole } from 'services/token-service';
import { drawerWidth } from 'constants';

import Profile from '../Profile';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: ({ role }) => {
      if (role === 'AdminApp') {
        return `calc(100% - ${drawerWidth}px)`;
      } else {
        return '100%';
      }
    },
    position: 'fixed',
  },
}));

const Header = () => {
  const token = useSelector((state) => state.token);

  const [userEmail, setUserEmail] = useState('');
  const [role, setRole] = useState('User');

  const classes = useStyles({ role });

  useEffect(() => {
    setUserEmail(getEmail(token.jwtToken));
    setRole(getRole(token.jwtToken));
  }, [token.jwtToken]);

  return (
    <AppBar color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Plane ticket reservation
        </Typography>
        <Profile userEmail={userEmail} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
