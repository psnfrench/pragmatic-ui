import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { PDatePicker } from '../components/PDatePicker';
import { PDateTimePicker } from '../components/PDateTimePicker';
import { PTimePicker } from '../components/PTimePicker';

function DateDemo() {
  return (
    <Box>
      <Typography variant="h4">Date Inputs</Typography>
      <Divider />
      <PDatePicker name="date1" label="Date" />
      <PDatePicker name="date1" label="Date Outlined" variant="outlined" />
      <PDatePicker name="date1" label="Date Formatted fill" variant="filled" format="dd/MM/yyyy" />
      <PDateTimePicker name="date2" label="Date Time" />
      <PDateTimePicker name="date2" label="Date Time Outlined" variant="outlined" />
      <PTimePicker name="time1" label="Time" />
      <PTimePicker name="time1" label="Time Outlined" variant="outlined" />
      <PTimePicker name="time1" label="Time Formatted" format="HH:mm:ss" />
    </Box>
  );
}

export default DateDemo;
