import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import ManagersList from './ManagersList';

const CompanyManagersDialogContent = ({ companyId }) => {
  return (
    <>
      <DialogContent>
        <ManagersList companyId={companyId}/>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<PersonAddIcon />}
        >
          Add new manager
        </Button>
      </DialogContent>
    </>
  );
};

export default CompanyManagersDialogContent;