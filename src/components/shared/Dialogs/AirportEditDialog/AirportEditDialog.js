import React from 'react';

import CustomDialog from '../../CustomDialog';
import AirportEditDialogContent from './AirportEditDialogContent';

const AirportEditDialog = ({ airport, company, isOpened, closeDialog }) => {
  return (
    <CustomDialog
      title="Edit airport"
      isOpened={isOpened}
      closeDialog={closeDialog}
      DialogContent={
        <AirportEditDialogContent
          airport={airport}
          company={company}
          closeDialog={closeDialog}
        />
      }
    />
  );
};

export default AirportEditDialog;
