import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PTextField } from '../components/PTextField';

function SelectDemo() {
  return (
    <Box>
      <Typography variant="h4">TODO Select Demo</Typography>
      <Divider />
      <PTextField name="firstName" label="First Name" />
      <PTextField name="description" label="Description (multiline)" multiline={true} />
    </Box>
  );
}

export default SelectDemo;
