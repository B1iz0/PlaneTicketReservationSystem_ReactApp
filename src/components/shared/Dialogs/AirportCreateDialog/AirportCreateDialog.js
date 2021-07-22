import React from 'react';

import CustomDialog from '../../CustomDialog';
import AirportCreateDialogContent from './AirportCreateDialogContent';

const AirportCreateDialog = ({ company, isOpened, closeDialog }) => {
  return (
    <CustomDialog
      title="Airport registration"
      isOpened={isOpened}
      closeDialog={closeDialog}
      DialogContent={<AirportCreateDialogContent company={company} closeDialog={closeDialog}/>}
    />
  );
};

export default AirportCreateDialog;
