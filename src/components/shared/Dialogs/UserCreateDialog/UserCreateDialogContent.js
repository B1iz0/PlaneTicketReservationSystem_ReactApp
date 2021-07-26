import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

import AdminUserCreationForm from './AdminUserCreationForm';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(3),
  },
}));

const UserCreateDialogContent = ({ closeDialog }) => {
  const classes = useStyles();

  const onSubmit = async (values) => {
    closeDialog();
  }

  return (
    <DialogContent className={classes.dialogContent}>
      <AdminUserCreationForm 
        onSubmit={onSubmit}
      />
    </DialogContent>
  );
};

export default UserCreateDialogContent;