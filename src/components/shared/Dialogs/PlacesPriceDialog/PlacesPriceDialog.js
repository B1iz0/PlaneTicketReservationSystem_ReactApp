import React from 'react';

import CustomDialog from '../../CustomDialog';
import PlacesPriceDialogContent from './PlacesPriceDialogContent';

const PlacesPriceDialog = ({ airplane, isOpened, closeDialog }) => {
  return (
    <CustomDialog
      title="Places price"
      isOpened={isOpened}
      closeDialog={closeDialog}
      DialogContent={
        <PlacesPriceDialogContent
          airplane={airplane}
          closeDialog={closeDialog}
        />
      }
    />
  );
};

export default PlacesPriceDialog;
