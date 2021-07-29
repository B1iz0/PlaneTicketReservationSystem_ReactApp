import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { setIsSimpleSuccessNotificationActive, setSimpleSuccessNotificationText } from 'reduxStore/notificationsSlice';

import Alert from 'shared/Alert';

const SuccessNotification = () => {
  const notifications = useSelector((state) => state.notifications);
  let timer = null;
  const dispatch = useDispatch();

  useEffect(() => {
    const autoHide = async () => {
      timer = await setTimeout(() => {
        dispatch(setIsSimpleSuccessNotificationActive(false));
        dispatch(setSimpleSuccessNotificationText(''));
      }, 3000);
    };

    if (notifications.isSimpleSuccessNotificationActive) {
      autoHide();
    };
  }, [notifications.isSimpleSuccessNotificationActive]);

  const handleClose = () => {
    dispatch(setIsSimpleSuccessNotificationActive(false));
    dispatch(setSimpleSuccessNotificationText(''));
  };

  return (
    <SnackBar
      open={notifications.isSimpleSuccessNotificationActive}
    >
      <Alert onClose={handleClose} severity="success">
        <Typography variant="body1">
          {notifications.simpleSuccessNotificationText}
        </Typography>
      </Alert>
    </SnackBar>
  );
};

export default SuccessNotification;