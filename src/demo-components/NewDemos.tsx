import { Box } from '@mui/material';
import React from 'react';
import { FileDropzone } from '../components/FileDropZone';
import { Search } from '../components/Search';

const fileFormatExample = {
  'application/pdf': ['.pdf'],
};

const NewDemos = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Box>
      <Search placeholder="Search Demo..." onChange={handleSearchChange} />
      <FileDropzone name="" fileFormat={fileFormatExample} maxFiles={0} />
      <br />
    </Box>
  );
};

export default NewDemos;
