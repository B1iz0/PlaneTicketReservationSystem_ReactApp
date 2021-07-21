import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { setIsBookingCreationActive } from 'reduxStore/notificationsSlice';

import Alert from './Alert';

const BookingCreationNotification = () => {
  const notifications = useSelector((state) => state.notifications);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsBookingCreationActive(false));
  };

  const handleGoToMyBookingsClick = () => {
    history.push('/account');
    dispatch(setIsBookingCreationActive(false));
  };

  return (
    <SnackBar
      open={notifications.isBookingCreationActive}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity="success">
        <Typography gutterBottom variant="body1">
          The ticket was booked successfully!
        </Typography>
        {location.pathname !== '/account' && (
          <Button variant="outlined" onClick={handleGoToMyBookingsClick}>
            Go to my bookings
          </Button>
        )}
      </Alert>
    </SnackBar>
  );
};

export default BookingCreationNotification;
