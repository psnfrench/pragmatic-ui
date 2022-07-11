import React from 'react';
import { Search } from '../components/Search';

const SearchDemo = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <Search fullWidth placeholder="Search Demo..." onChange={handleSearchChange} />;
};

export default SearchDemo;
