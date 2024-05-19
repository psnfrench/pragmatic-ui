import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { PSwitch } from '../components/PSwitch';

function SwitchDemo() {
  return (
    <Box>
      <Typography variant="h4">Switch</Typography>
      <Divider />
      <PSwitch name="staySignedIn" label="Stay Signed In" />
      <br />
      <PSwitch name="staySignedIn" label="Label At Start" FormControlLabelProps={{ labelPlacement: 'start' }} />
      <br />
    </Box>
  );
}

export default SwitchDemo;
