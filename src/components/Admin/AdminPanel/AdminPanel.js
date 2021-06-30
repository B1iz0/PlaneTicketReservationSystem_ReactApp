import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  BusinessCenter,
  Flight,
  FlightTakeoff,
  Group,
} from '@material-ui/icons';

import { drawerWidth } from 'constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: '#f4f4f4',
  },
  title: {
    padding: theme.spacing(2),
  },
}));

const AdminPanel = () => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const menuItems = [
    {
      text: 'Users',
      icon: <Group color="primary" />,
      path: '/admin/users',
    },
    {
      text: 'Companies',
      icon: <BusinessCenter color="primary" />,
      path: '/admin/companies',
    },
    {
      text: 'Airplanes',
      icon: <Flight color="primary" />,
      path: '/admin/airplanes',
    },
    {
      text: 'Flights',
      icon: <FlightTakeoff color="primary" />,
      path: '/admin/flights',
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <div>
        <Typography variant="h5" className={classes.title}>
          Admin panel
        </Typography>
      </div>

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
            className={location.pathname === item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminPanel;
