import { Box, Chip, Divider, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { menuItemType, PComplexFilter } from '../components/PComplexFilter';
import PIcon from '../images/PIcon';

const options: menuItemType[] = [
  {
    text: 'Transport',
    icon: <PIcon name="addIcon" />,
    children: [
      { text: 'Vehicle', children: [{ text: 'Car', children: [{ text: 'Fiat Bambina' }] }] },
      { text: 'Bike' },
    ],
  },
  { text: 'Sport' },
  { text: 'Education' },
  { text: 'Hobbies' },
  { text: 'Social', children: [{ text: 'People' }] },
  { text: 'Informative' },
  { text: 'Travel', children: [{ text: 'Countries' }] },
];

type itemType = {
  text: string;
  icon?: React.ReactNode;
  categories?: string[];
  children?: itemType[];
};

const items: itemType[] = [
  { text: 'Fiat Bambina', categories: ['Transport', 'Vehicle', 'Car', 'Fiat Bambina'] },
  {
    text: 'South Africa',
    categories: ['Travel', 'Countries'],
    children: [
      {
        text: 'Springboks',
        categories: ['Countries', 'Sport'],
        children: [{ text: 'Siya Kolisi', categories: ['Countries', 'Sport', 'People'] }],
      },
    ],
  },
  { text: 'item 3', categories: ['Phobos', 'Dione'] },
  { text: 'item 4', categories: ['Pyxis', 'Callisto'] },
  { text: 'item 5', categories: ['Dione', 'Sedna'] },
  { text: 'item 6', categories: ['Triton', 'Umbriel'] },
  { text: 'item 7', categories: ['Phobos', 'Pyxis'] },
  { text: 'item 8', categories: ['Sedna', 'Dione'] },
  { text: 'item 9', categories: ['Callisto', 'Childs Childs Child 1'] },
  { text: 'item 10', categories: ['Phobos', 'Callisto'] },
];

const ComplexFilterDemo = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [deleteing, setDeleteing] = useState(false);
  let newItems: itemType[] = [];
  const [filteredOptions, setFilteredOptions] = useState(_.clone(items));

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
    setFilteredOptions(_.clone(items));
  };

  // removes filter when Chip deleted
  const handleDelete = (filter: string) => {
    setDeleteing(true);
    setCurrentFilters((prev) => prev.filter((i) => i !== filter));
  };

  // Maps out all data including children (that are theoretically infinite)
  function displayData(item: itemType[], child?: boolean) {
    return item.map((option, key) => (
      <Box key={key} display="flex" flexDirection="column">
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

  // maps through returned items to list
  async function mapItems(items: itemType[]) {
    // sets object to be filtered
    let newOptions = _.clone(items);
    let tempOption = null;
    // maps new object
    newOptions.map((option, key) => {
      option.children ? mapItems(option.children) : null;
      option.categories.map((category) => {
        // if object exists in filter, adds to array
        currentFilters.includes(category) ? <>{newItems.push(option)}</> : null;
      });
    });
  }

  useEffect(() => {
    setFilteredOptions(filteredOptions.splice(0, filteredOptions.length));
    if (currentFilters.length === 0) {
      setFilteredOptions(_.clone(items));
    } else {
      mapItems(items).then(() => setFilteredOptions(_.clone(newItems)));
    }
  }, [currentFilters]);

  return (
    <Box>
      <>
        <Typography variant="h4">Complex Filter</Typography>
        <Divider />
        <PComplexFilter
          // the array that will populate the filter
          items={options}
          searchable={true}
          // if included, the filter will contain a searchbar. This also handles when the search input field is altered
          //handleSearchChange={handleSearchChange}
          // this handles when the search is submitted (potentially irrelevant)
          //handleSearchSubmit={handleSearchSubmit}
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
          paperProps={{ style: { backgroundColor: 'white', left: '0px' } }}
          // Example of changing the title
          titleProps={{ variant: 'body1', padding: 4 }}
          listItemProps={{ color: 'secondary' }}
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
        {displayData(filteredOptions)}
      </>
    </Box>
  );
};

export default ComplexFilterDemo;
