import { Box, Button, Chip, Divider, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { itemType, PComplexFilter } from '../components/PComplexFilter/PComplexFilter';
import PIcon from '../images/PIcon';

const options: itemType[] = [
  {
    text: 'Atria',
    icon: <PIcon name="addIcon" />,
    children: [
      { text: 'Child1', children: [{ text: 'Childs Child 1', children: [{ text: 'Childs Childs Child 1' }] }] },
      { text: 'Child2' },
    ],
  },
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
  const [currentFilters, setCurrentFilters] = useState([]);
  const [deleteing, setDeleteing] = useState(false);
  let newOptions: itemType[] = _.clone(options);
  const [filteredOptions, setFilteredOptions] = useState(newOptions);
  let vars: any;
  const [update, setUpdate] = useState(Boolean(0));

  // TODO get this functioning. When search enabled, only results that match are in the menu
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault;
    const found = options.find((option) => {
      return option.text === event.target.value;
    });
    console.log(found);
  };

  // TODO get this functioning. Same as above
  const handleSearchSubmit = (e: any) => {
    e.preventDefault;
    console.log('Hi');
  };

  const handleSelected = (event: React.MouseEvent<HTMLLIElement>, key: string) => {
    // adds the new filter to the filters array
    setCurrentFilters((currentFilters) => [...currentFilters, key]);
    // sets the selected key
    setSelectedKey(key);
    // use if every time someone clicks a filter, you want the menu to go away. Remove if not wanted
    // setAnchorEl(null);
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleClear = () => {
    setCurrentFilters([]);
    setFilteredOptions(_.clone(options));
  };

  // removes filter when Chip deleted
  const handleDelete = (filter: string) => {
    setTimeout(function () {
      setDeleteing(true);
    }, 100);
    setCurrentFilters((prev) => prev.filter((i) => i !== filter));
    setTimeout(function () {
      setDeleteing(false);
    }, 100);
  };

  // Maps out all data including children (that are theoretically infinite)
  function displayData(item: itemType[], child?: boolean) {
    return item.map((option) => (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          {child && '-'}
          {option.icon}
          {option.text}
        </Box>
        {option.children && (
          <Box display="flex" flexDirection="row" paddingLeft="12px">
            {displayData(option.children, true)}
          </Box>
        )}
      </Box>
    ));
  }

  function mapItems(item: itemType[]) {
    {
      newOptions = _.clone(item);
    }
    newOptions.map((option) => (
      <>
        {currentFilters.includes(option.text) ? setFilteredOptions([...filteredOptions, option]) : null}
        {option.children ? mapItems(option.children) : null}
      </>
    ));
  }

  // Demonstrates the current filters working with chips
  useEffect(() => {
    currentFilters.length > 0 && !deleteing ? (
      <>
        {currentFilters.length > 1 ? null : setFilteredOptions(filteredOptions.splice(0, filteredOptions.length))}
        {mapItems(options)}
      </>
    ) : null;
    currentFilters.length < 1 ? setFilteredOptions(_.clone(options)) : null;
    setTimeout(function () {
      setUpdate((update) => !update);
    }, 100);
  }, [currentFilters]);

  return (
    <Box>
      <>
        <Typography variant="h4">Complex Filter</Typography>
        <Divider />
        <PComplexFilter
          // the array that will populate the filter
          items={options}
          // if included, the filter will contain a searchbar. This also handles when the search input field is altered
          handleSearchChange={handleSearchChange}
          // this handles when the search is submitted (potentially irrelevant)
          handleSearchSubmit={handleSearchSubmit}
          // choose between 'single' and 'multiple'. Multiple allows several options to be selected and removed, single only allows one
          selectVariant={'multiple'}
          // sets the title at the top of the menu
          title={'Filter Search'}
          // Mainly used for single, focusses on the selected item and changes color to primary.main
          selectedItem={selectedKey}
          // pass the function that you want to execute when one is selected
          handleSelected={handleSelected}
          // Having anchorEl & setAnchorEl here allows control over the popup appearing or disappearing
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          currentFilters={currentFilters}
          // Populated string array of all currently selected filters
          setCurrentFilters={setCurrentFilters}
          // Example of sending props to the button to change its style
          buttonProps={{ variant: 'contained', sx: { width: '100px' } }}
          // Example of changing the menu style
          menuPaperProps={{ style: { backgroundColor: 'white' } }}
          // Example of changing the title
          titleProps={{ variant: 'body1', margin: '8px' }}
          menuItemProps={{ color: 'red' }}
          menuListProps={{ color: 'red' }}
        />
        <br />
        {/* Example of mapping Chips for each filter with clear button */}
        {currentFilters.map((filter, key) => (
          <Chip
            key={key}
            sx={{ marginRight: '16px' }}
            label={filter}
            variant="outlined"
            onClick={handleClick}
            onDelete={() => handleDelete(filter)}
          />
        ))}
        {currentFilters.length != 0 ? (
          <>
            <Chip color="primary" label="Clear All" onClick={handleClear} onDelete={handleClear} />
            <br />
            <br />
          </>
        ) : null}
        {useMemo(() => displayData(filteredOptions), [update])}
      </>
    </Box>
  );
};

export default ComplexFilterDemo;
