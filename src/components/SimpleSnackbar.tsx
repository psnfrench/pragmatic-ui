import React from 'react';
import Snackbar, { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

export function SimpleSnackbar(
  props: { open: boolean; setOpen: (open: boolean) => void; severity?: AlertColor } & SnackbarProps,
) {
  const { open, setOpen, message, severity = 'success', onClose, ...otherProps } = props;

  const handleClose = (
    event: Event | React.SyntheticEvent<unknown, Event>,
    reason: SnackbarCloseReason = 'timeout',
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <Snackbar
      key={message}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      {...otherProps}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
