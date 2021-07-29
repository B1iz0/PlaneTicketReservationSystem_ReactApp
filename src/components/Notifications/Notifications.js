import React from 'react';

import SuccessNotification from './SuccessNotification';
import BookingCreationNotification from './BookingCreationNotification';

const Notifications = () => {
  return (
    <>
      <SuccessNotification />
      <BookingCreationNotification />
    </>
  );
};

export default Notifications;
