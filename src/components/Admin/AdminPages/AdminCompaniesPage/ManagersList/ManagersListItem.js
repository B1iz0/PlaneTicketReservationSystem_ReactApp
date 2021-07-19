import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    color: red[500],
  },
}));

const ManagersListItem = ({ manager }) => {
  const classes = useStyles();

  const handleDeleteButtonClick = () => {

  }

  return (
    <Grid item container xs={12}>
      <Grid item xs={3}>
        <Typography>{manager?.email}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>{manager?.firstName} {manager?.lastName}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{manager?.phoneNumber}</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton 
          className={classes.deleteButton}
          onClick={() => handleDeleteButtonClick()}  
        >
          <HighlightOffIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ManagersListItem;