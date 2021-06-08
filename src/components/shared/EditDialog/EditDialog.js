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

const EditDialog = ({ isOpened, closeEditDialog, EditDialogContent, elementUrl }) => {
    return(
        <Dialog
        open={isOpened}
        onClose={() => closeEditDialog()}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Subscribe
            </DialogTitle>
            <EditDialogContent elementUrl={elementUrl}/>
            <DialogActions>
                <Button autoFocus onClick={() => closeEditDialog()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => closeEditDialog()} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
      </Dialog>
    );
};

export default EditDialog;