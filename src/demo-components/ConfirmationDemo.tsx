import React, { useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ConfirmationServiceContext } from '../context/confirmation';
import { SnackBarContext } from '../context/snackbar';
import SendIcon from '@mui/icons-material/Send';

function ConfirmationDemo() {
  const { showConfirmationModal, setOpenId } = useContext(ConfirmationServiceContext);
  const { showSnack } = useContext(SnackBarContext);

  const handleResponse = useCallback(
    (
      confimedResponse: void | {
        confirmed: boolean;
      },
    ) => {
      if (confimedResponse && confimedResponse.confirmed !== undefined) {
        if (confimedResponse.confirmed) {
          setOpenId(undefined);
          showSnack('User has confirmed it', 'success');
        } else {
          showSnack('User has Canceled it', 'error');
        }
      } else {
        showSnack('User has clicked outside of modal or press escape', 'info');
      }
    },
    [setOpenId, showSnack],
  );

  const showMessage = async () => {
    const confimedResponse = await showConfirmationModal({
      title: 'Confirm It',
      contentText: 'Do you really want to continue?',
      continueText: 'Yes, I am sure',
      cancelText: 'No thanks',
    });
    handleResponse(confimedResponse);
  };

  const showStyledMessage = async () => {
    const confimedResponse = await showConfirmationModal({
      DialogPaperProps: {
        sx: { paddingX: 2 },
      },
      title: '',
      contentText: 'Do you want to notify the council of this new Staff Member?',
      contentProps: {
        color: '#282750',
        variant: 'subtitle2',
      },
      continueText: (
        <>
          <SendIcon sx={{ mr: 1 }} /> Send Form
        </>
      ),
      actionsSx: { flexDirection: 'row-reverse' },
      cancelButtonProps: { sx: { ml: '0px !important', mr: 0.5, flex: 1 }, variant: 'contained' },
      continueButtonProps: { sx: { flex: 1, ml: 0.5 }, color: 'secondary' },
    });
    handleResponse(confimedResponse);
  };
  return (
    <Box mb={2}>
      <Typography variant="h4">Confirmation Service</Typography>
      <Divider />
      <Button sx={{ mr: 2 }} variant="contained" onClick={showMessage}>
        Show Confirmation Message
      </Button>
      <Button sx={{ mr: 2 }} variant="contained" onClick={showStyledMessage}>
        Show Styled Confirmation Message
      </Button>
    </Box>
  );
}

export default ConfirmationDemo;
