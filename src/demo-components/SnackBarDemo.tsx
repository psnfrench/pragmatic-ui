import React, { useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SnackBarContext } from '../context/snackbar';
import startCase from 'lodash/startCase';
import { AlertColor } from '@mui/material/Alert';

function SnackBarDemo() {
  const severities = useRef<AlertColor[]>(['success', 'info', 'warning', 'error']).current;
  return (
    <Box mb={2}>
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
