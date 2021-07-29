import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { setIsCompanyCreationActive } from 'reduxStore/notificationsSlice';

import Alert from 'shared/Alert';

const CompanyCreationNotification = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsCompanyCreationActive(false));
  };

  return (
    <SnackBar
      open={notifications.isCompanyCreationActive}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity="success">
        <Typography gutterBottom variant="body1">
          The company was created successfully!
        </Typography>
      </Alert>
    </SnackBar>
  );
};

export default CompanyCreationNotification;
