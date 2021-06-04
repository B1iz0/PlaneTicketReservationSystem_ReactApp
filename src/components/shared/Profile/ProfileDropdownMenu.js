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
import { useDispatch } from 'react-redux'
import { removeJwtToken, removeRefreshToken } from '../../../redux/tokenSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  accountIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProfileDropdownMenu = ({ userEmail }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const dispatch = useDispatch()

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
                <AccountCircleIcon className={classes.accountIcon}/>
                {userEmail}
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </div>
    );
}

export default ProfileDropdownMenu;