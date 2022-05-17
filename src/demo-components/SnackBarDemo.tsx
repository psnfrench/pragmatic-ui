import React, { useContext, useRef } from 'react';
import { Box, Divider, Typography, Button, AlertColor } from '@mui/material';
import { SnackBarContext } from '../context/snackbar';
import startCase from 'lodash/startCase';

function SnackBarDemo() {
  const severities = useRef<AlertColor[]>(['success', 'info', 'warning', 'error']).current;
  return (
    <Box mb={2}>
      <Divider />
      <Typography variant="h4">Snack Bars</Typography>
      <Divider />
      {severities.map((severity) => (
        <ShowSnackButton key={severity} severity={severity} />
      ))}
    </Box>
  );
}

const ShowSnackButton = ({ severity }: { severity: AlertColor }) => {
  const { showSnack } = useContext(SnackBarContext);
  return (
    <Button
      sx={{ mr: 2 }}
      variant="contained"
      color={severity}
      onClick={() => showSnack(`${startCase(severity)} message`, severity)}
    >
      Show {startCase(severity)} Message
    </Button>
  );
};

export default SnackBarDemo;
