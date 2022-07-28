import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Search } from '../components/Search';

const SearchDemo = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4">Searchbar</Typography>
      <Divider />
      <Search fullWidth placeholderText="Search Demo..." onChange={handleSearchChange} />
      <br />
      <br />
    </Box>
  );
};

export default SearchDemo;
