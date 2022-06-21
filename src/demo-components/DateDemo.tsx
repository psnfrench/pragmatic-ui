import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PDatePicker } from '../components/PDatePicker';
import { PDateTimePicker } from '../components/PDateTimePicker';

function DateDemo() {
  return (
    <Box>
      <Typography variant="h4">Date Inputs</Typography>
      <Divider />
      <PDatePicker name="date1" label="Date" />
      <PDatePicker name="date1" label="Date Outlined" variant="outlined" />
      <PDateTimePicker name="date2" label="Date Time" />
      <PDateTimePicker name="date2" label="Date Time Outlined" variant="outlined" />
    </Box>
  );
}

export default DateDemo;
