import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const CustomDialog = ({ isOpened, closeDialog, DialogContent }) => {
    return(
        <Dialog
        open={isOpened}
        onClose={() => closeDialog()}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        >
          {DialogContent}
          <DialogActions>
              <Button autoFocus onClick={() => closeDialog()} color="primary">
                  Cancel
              </Button>
          </DialogActions>
      </Dialog>
    );
};

export default CustomDialog;