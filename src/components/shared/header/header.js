import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import { useSelector } from "react-redux";

import { getEmail } from "services/token-service";

import Profile from "../Profile";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const token = useSelector((state) => state.token);

  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(getEmail(token.jwtToken));
  }, [token.jwtToken]);

  return (
    <header>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Company name
          </Typography>
          <Profile userEmail={userEmail} />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
