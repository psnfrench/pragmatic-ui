import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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
