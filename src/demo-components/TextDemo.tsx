import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PTextField } from '../components/PTextField';

function TextDemo() {
  return (
    <Box>
      <Divider />
      <Typography variant="h4">Text Inputs</Typography>
      <Divider />
      <PTextField name="firstName" label="First Name" />
    </Box>
  );
}

export default TextDemo;
