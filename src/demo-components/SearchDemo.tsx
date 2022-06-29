import { Box } from '@mui/material';
import React from 'react';
import { Search } from '../components/Search';

const SearchDemo = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Box>
      <Search placeholder="Search Demo..." onChange={handleSearchChange} />
    </Box>
  );
};

export default SearchDemo;
