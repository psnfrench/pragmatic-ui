import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { PRadioGroup } from '../components/PRadioGroup';

function RadioDemo() {
  const radioButtons = useRef([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]).current;
  return (
    <Box>
      <Typography variant="h4">Radio Inputs</Typography>
      <Divider />
      <PRadioGroup formLabel="Select Gender" name="gender" radioButtons={radioButtons} />
      <br />
      <br />
    </Box>
  );
}

export default RadioDemo;
