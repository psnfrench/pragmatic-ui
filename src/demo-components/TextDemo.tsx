import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PTextField } from '../components/PTextField';

function TextDemo() {
  return (
    <Box>
      <Typography variant="h4">Text Inputs</Typography>
      <Divider />
      <PTextField name="firstName" label="First Name" />
      <PTextField name="firstName" label="First Name Outlined" variant="outlined" />
      <PTextField name="description" label="Description (multiline)" multiline={true} />
    </Box>
  );
}

export default TextDemo;
