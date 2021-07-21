import React from 'react';

import CustomDialog from '../../CustomDialog';
import AirportCreateDialogContent from './AirportCreateDialogContent';

const AirportCreateDialog = ({ isOpened, closeDialog }) => {
  return (
    <CustomDialog 
      title='Airport registration'
      isOpened={isOpened}
      closeDialog={closeDialog}
      DialogContent={<AirportCreateDialogContent />}
    />
  );
};

export default AirportCreateDialog;