import React, { useState } from 'react';
import { itemType, PComplexFilter } from '../components/ComplexFilterOriginal/PComplexFilterOriginal';
import PIcon from '../images/PIcon';

const options: itemType[] = [
  { text: 'Nosssne' },
  { text: 'Atria', icon: <PIcon name="addIcon" />, children: [{ text: 'Child1' }, { text: 'Child2' }] },
  { text: 'Callisto' },
  { text: 'Dione' },
  { text: 'Ganymede' },
  { text: 'Hangouts Call' },
  { text: 'Luna' },
  { text: 'Oberon' },
  { text: 'Phobos' },
  { text: 'Pyxis' },
  { text: 'Sedna' },
  { text: 'Titania' },
  { text: 'Triton' },
  { text: 'Umbriel' },
];

const ComplexFilterDemo = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault;
    console.log(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    console.log(e);
    console.log('Hi');
  };

  const handleSelected = (event: React.MouseEvent<HTMLLIElement>, key: string) => {
    setSelectedKey(key);
    setAnchorEl(null);
  };

  return (
    <PComplexFilter
      items={options}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={handleSearchSubmit}
      selectedItem={selectedKey}
      handleSelected={handleSelected}
      setAnchorEl={setAnchorEl}
      anchorEl={anchorEl}
    />
  );
};

export default ComplexFilterDemo;
