import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FileDropZone } from '../components/FileDropZone';

const fileFormatExample = {
  'application/images': ['.jpg', '.jpeg', '.png'],
  'application/pdf': ['.pdf'],
};

const FileDropZoneDemo = () => {
  return (
    <Box>
      <Typography variant="h4">File Dropzone</Typography>
      <Divider />
      <FileDropZone name="images" fileFormat={fileFormatExample} maxFiles={0} featured />

      <br />
    </Box>
  );
};

export default FileDropZoneDemo;
