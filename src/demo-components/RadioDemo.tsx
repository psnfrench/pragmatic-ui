import React, { useRef } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PRadioGroup } from '../components/PRadioGroup';

function RadioDemo() {
  const radioButtons = useRef([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]).current;
  return (
    <Box>
      <Divider />
      <Typography variant="h4">Radio Inputs</Typography>
      <Divider />
      <PRadioGroup formLabel="Select Gender" name="gender" radioButtons={radioButtons} />
    </Box>
  );
}

export default RadioDemo;
