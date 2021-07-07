import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteConfirmDialog = ({ isOpened, handleConfirmation, handleRejection }) => {
  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleRejection}
      >
        <DialogTitle>{"Do you really want to delete this?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete it now you will not have an oportunity to restore this data anymore
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejection} color="primary">
            Disagree
          </Button>
          <Button onClick={handleConfirmation} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmDialog;