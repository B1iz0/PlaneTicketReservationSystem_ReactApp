import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ManagersListItem from './ManagersListItem';

const useStyles = makeStyles((theme) => ({
  managersListPaper: {
    padding: theme.spacing(2),
  },
}));

const ManagersList = ({ managers, handleDeleteManager }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.managersListPaper}>
      <Grid container spacing={2}>
        {managers.length === 0 && (
          <Grid item>
            <Typography>No managers</Typography>
          </Grid>
        )}
        {managers?.map((manager) => {
          return (
            <ManagersListItem
              key={manager.id}
              manager={manager}
              handleDeleteManager={handleDeleteManager}
            />
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ManagersList;
