import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { FileDropZone } from '../components/FileDropZone';

const fileFormatExample = {
  'apllication/images': ['.jpg', '.jpeg', '.png'],
  'application/pdf': ['.pdf'],
};

const FileDropZoneDemo = () => {
  return (
    <Box>
      <Typography variant="h4">File Dropzone</Typography>
      <Divider />
      <FileDropZone name="downloads" maxFiles={0} featured />

      <br />
    </Box>
  );
};

export default FileDropZoneDemo;
