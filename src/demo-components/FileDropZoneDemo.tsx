import { Box } from '@mui/material';
import React from 'react';
import { FileDropzone } from '../components/FileDropZone';

const fileFormatExample = {
  'application/pdf': ['.pdf'],
};

const FileDropZoneDemo = () => {
  return (
    <Box>
      <FileDropzone name="" fileFormat={fileFormatExample} maxFiles={0} />
      <br />
    </Box>
  );
};

export default FileDropZoneDemo;
