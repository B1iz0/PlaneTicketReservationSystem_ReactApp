import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const handleClickClose = () => {};

const CustomDialog = ({ isOpened, closeDialog, DialogContent, title }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={() => closeDialog()}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <MuiDialogTitle>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => closeDialog()}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      {DialogContent}
    </Dialog>
  );
};

export default CustomDialog;
