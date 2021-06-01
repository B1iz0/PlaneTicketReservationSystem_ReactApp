import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import TokenService from '../../../services/token-service';

import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  }
}));

const Header = () => {
    const jwtToken = useSelector((state) => state.jwtToken.value)

    const classes = useStyles();
    let tokenService = new TokenService();
    const [ userEmail, setUserEmail ] = useState('');

    const profile = () => {
        return userEmail ? (
        <Typography variant="h5">
          {userEmail}
        </Typography>
        ) : (
        <Button href="/SignIn" variant="contained" color="primary">
          Sign in
        </Button>
        );
    } 

    useEffect(() => {
      setUserEmail(tokenService.getEmail(jwtToken));
    }, [jwtToken]);

    return (
      <header>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
                Company name
            </Typography>
            { profile() }
          </Toolbar>
        </AppBar>
      </header>
    );
  };
  
  export default Header;