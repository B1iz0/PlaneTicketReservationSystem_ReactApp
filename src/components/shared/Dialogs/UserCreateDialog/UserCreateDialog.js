import React from 'react';

import CustomDialog from 'components/shared/CustomDialog';

import UserCreateDialogContent from './UserCreateDialogContent';

const UserCreateDialog = ({ isOpened, closeDialog }) => {
  return (
    <CustomDialog
      title='User registration'
      isOpened={isOpened}
      closeDialog={closeDialog}
      DialogContent={<UserCreateDialogContent closeDialog={closeDialog}/>}
    >
    </CustomDialog>
  );
};

export default UserCreateDialog;