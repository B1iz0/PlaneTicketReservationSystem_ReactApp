import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ManagersListItem from './ManagersListItem';

const useStyles = makeStyles(theme => ({
  managersListPaper: {
    padding: theme.spacing(2),
  },
}));

const ManagersList = ({ companyId }) => {
  const classes = useStyles();
  // const [managers, setManagers] = useState([]);

  const managers = [
    { id: 1, email: 'test1', firstName: 'test1', lastName: 'test1', phoneNumber: 'test1'},
    { id: 2, email: 'test2', firstName: 'test2', lastName: 'test2', phoneNumber: 'test2'},
    { id: 3, email: 'test3', firstName: 'test3', lastName: 'test3', phoneNumber: 'test3'},
  ]

  useEffect(() => {
    const fetchData = async () => {

    };

    fetchData();
  }, []);

  return (
    <Paper variant='outlined' className={classes.managersListPaper}>
      <Grid container>
        {managers?.map(manager => {
          return (
            <ManagersListItem key={manager.id} manager={manager}/>
          )
        })}
      </Grid>
    </Paper>
  );
};

export default ManagersList;