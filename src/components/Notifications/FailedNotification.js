import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import {
  setIsFailedNotificationActive,
  setFailedNotificationText,
} from 'reduxStore/notificationsSlice';

import Alert from 'shared/Alert';

const FailedNotification = () => {
  const notifications = useSelector((state) => state.notifications);
  let timer = null;
  const dispatch = useDispatch();

  useEffect(() => {
    const autoHide = async () => {
      timer = await setTimeout(() => {
        dispatch(setIsFailedNotificationActive(false));
        dispatch(setFailedNotificationText(''));
      }, 3000);
    };

    if (notifications.isFailedNotificationActive) {
      autoHide();
    }
  }, [notifications.isFailedNotificationActive]);

  const handleClose = () => {
    dispatch(setIsFailedNotificationActive(false));
    dispatch(setFailedNotificationText(''));
  };

  return (
    <SnackBar open={notifications.isFailedNotificationActive}>
      <Alert onClose={handleClose} severity="error">
        <Typography variant="body1">
          {notifications.failedNotificationText}
        </Typography>
      </Alert>
    </SnackBar>
  );
};

export default FailedNotification;
