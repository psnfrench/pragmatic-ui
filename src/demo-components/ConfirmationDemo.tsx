import React, { useContext } from 'react';
import { Box, Divider, Typography, Button } from '@mui/material';
import { ConfirmationServiceContext } from '../context/confirmation';
import { SnackBarContext } from '../context/snackbar';

function ConfirmationDemo() {
  const { showConfirmationModal, setOpenId } = useContext(ConfirmationServiceContext);
  const { showSnack } = useContext(SnackBarContext);

  const showMessage = async () => {
    const confimedResponse = await showConfirmationModal({
      title: 'Confirm It',
      contentText: 'Do you ready want to continue?',
    });
    if (confimedResponse && confimedResponse.confirmed) {
      setOpenId(undefined);
      showSnack('User has confirmed it', 'success');
    } else {
      showSnack('User has Canceled it', 'error');
    }
  };
  return (
    <Box mb={2}>
      <Divider />
      <Typography variant="h4">Confirmation Service</Typography>
      <Divider />
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        // color={severity}
        onClick={showMessage}
      >
        Show Confirmation Message
      </Button>
    </Box>
  );
}

export default ConfirmationDemo;
