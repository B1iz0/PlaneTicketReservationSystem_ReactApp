import React from 'react';

import BookingCreationNotification from './BookingCreationNotification';
import CompanyCreationNotification from './CompanyCreationNotification';

const Notifications = () => {
  return (
    <>
      <BookingCreationNotification />
      <CompanyCreationNotification />
    </>
  );
};

export default Notifications;