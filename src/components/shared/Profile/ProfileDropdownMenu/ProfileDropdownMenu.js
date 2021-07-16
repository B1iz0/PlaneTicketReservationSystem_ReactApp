import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { removeJwtToken, removeRefreshToken } from 'reduxStore/tokenSlice';
import { getRole } from 'services/token-service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 5,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  accountIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProfileDropdownMenu = ({ userEmail }) => {
  const token = useSelector((state) => state.token);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole(token.jwtToken));
  }, [token.jwtToken]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = (event) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    dispatch(removeJwtToken());
    dispatch(removeRefreshToken());
    handleClose(event);
    history.push('/');
  };

  const handleMyProfileCLick = (event) => {
    handleClose(event);
    history.push('/account');
  }

  const handleMyCompanyClick = (event) => {
    handleClose(event);
    history.push('/myCompany');
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon className={classes.accountIcon} />
        {userEmail}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleMyProfileCLick}>My profile</MenuItem>
                  {role === 'Admin' ? <MenuItem onClick={handleMyCompanyClick}>My company</MenuItem> : null}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ProfileDropdownMenu;
