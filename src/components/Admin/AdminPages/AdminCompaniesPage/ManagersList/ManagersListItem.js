import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    color: red[500],
  },
}));

const ManagersListItem = ({ manager, handleDeleteManager }) => {
  const classes = useStyles();

  const handleDeleteButtonClick = () => {
    handleDeleteManager(manager);
  };

  return (
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Grid container>
          <Grid item xs={3} className={classes.gridItem}>
            <Typography variant="body1">{manager?.email}</Typography>
          </Grid>
          <Grid item xs={5} className={classes.gridItem}>
            <Typography variant="body1">
              {manager?.firstName} {manager?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
            <Typography variant="body1" noWrap>
              {manager?.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.gridItem}>
            <IconButton
              className={classes.deleteButton}
              onClick={() => handleDeleteButtonClick()}
            >
              <HighlightOffIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ManagersListItem;
