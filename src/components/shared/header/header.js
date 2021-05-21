import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Link, Typography } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  navElement: {
    marginRight: theme.spacing(3),
  }
}));

const Header = () => {
    const classes = useStyles();

    return (
      <header>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
                Company name
              </Typography>
              <Link href="#" className={classes.navElement}>
                Link№1
              </Link>
              <Link href="№" className={classes.navElement}>
                Link№2
              </Link>
            <Button href="/SignIn" variant="contained" color="primary">
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </header>
    );
  };
  
  export default Header;