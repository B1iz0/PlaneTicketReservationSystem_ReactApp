import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import TokenService from '../../../services/token-service';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  }
}));

const Header = ({ email }) => {
    const classes = useStyles();
    let tokenService = new TokenService();
    const [ isLoggined, setIsLoggined ] = useState(false);

    const profile = email ? <Typography variant="h5">
                                {email}
                            </Typography>
                          : <Button href="/SignIn" variant="contained" color="primary">
                              Sign in
                            </Button>;

    return (
      <header>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
                Company name
            </Typography>
            { profile }
          </Toolbar>
        </AppBar>
      </header>
    );
  };
  
  export default Header;