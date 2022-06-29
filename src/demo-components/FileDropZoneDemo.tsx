import { Box } from '@mui/material';
import React from 'react';
import { FileDropZone } from '../components/FileDropZone';

const fileFormatExample = {
  'application/pdf': ['.pdf'],
};

const FileDropZoneDemo = () => {
  return (
    <Box>
      <FileDropZone name="" fileFormat={fileFormatExample} maxFiles={0} />
      <br />
    </Box>
  );
};

export default FileDropZoneDemo;
