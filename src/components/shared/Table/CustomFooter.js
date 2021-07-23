import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { elementsOnAdminTable } from 'constants';

const useStyles = makeStyles((theme) => ({
  tableFooter: {
    padding: theme.spacing(1),
  },
  addButton: {
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
}));

const CustomFooter = ({ onAddClick, rowCount, page, onPageChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.tableFooter}>
      <Grid container justify="space-between">
        <Grid item>
          <IconButton size="small" color="primary" onClick={() => onAddClick()}>
            <AddCircleIcon className={classes.addButton} />
          </IconButton>
        </Grid>
        <Grid item>
          <TablePagination
            component="div"
            count={rowCount}
            page={page}
            rowsPerPage={elementsOnAdminTable}
            rowsPerPageOptions={[elementsOnAdminTable]}
            onChangePage={(event, value) => onPageChange(event, value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomFooter;
