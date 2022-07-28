import { ChevronRight } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import _, { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { menuItemType, PComplexFilter } from '../components/PComplexFilter';
import { Search } from '../components/Search';
import PIcon from '../images/PIcon';

const options: menuItemType[] = [
  {
    text: 'Transport',
    secondary: 'Moving stuff',
    icon: <PIcon name="addIcon" />,
    children: [
      {
        text: 'Vehicle',
        children: [{ text: 'Car' }, { text: 'Truck' }, { text: 'Ute' }],
      },
      {
        text: 'Bike',
        children: [{ text: 'Mountain Bike' }, { text: 'Downhill Bike' }, { text: 'E-Bike' }],
      },
    ],
  },
  {
    text: 'Sport',
    children: [{ text: 'Rugby' }, { text: 'Football' }, { text: 'Basketball' }],
  },
  {
    text: 'Education',
    children: [{ text: 'Primary' }, { text: 'Secondary' }, { text: 'Tertiary' }],
  },
  {
    text: 'Hobbies',
    children: [{ text: 'Guitar' }, { text: 'Hiking' }, { text: 'Reading' }],
  },
  { text: 'Social', children: [{ text: 'People' }] },
  {
    text: 'Travel',
    children: [
      {
        text: 'Countries',
        children: [{ text: 'South Africa' }, { text: 'France' }, { text: 'New Zealand' }],
      },
      {
        text: 'Activities',
        children: [{ text: 'Mountain Biking' }, { text: 'Whale Watching' }, { text: 'Visiting Holy Sites' }],
      },
    ],
  },
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
  {
    text: 'New Zealand',
    categories: ['Travel', 'Countries'],
    children: [
      {
        text: 'All Blacks',
        categories: ['Countries', 'Sport'],
        children: [
          { text: 'Richie McCaw', categories: ['Countries', 'Sport', 'People'] },
          { text: 'Conrad Smith', categories: ['Countries', 'Sport', 'People'] },
        ],
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentFilters, setCurrentFilters] = useState<menuItemType[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>();
  const [filteredOptions, setFilteredOptions] = useState([...items]);
  const [searchedOptions, setSearchedOptions] = useState([...items]);
  let newItems: itemType[] = [];
  let newSearchItems: itemType[] = [];

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

  // Maps out all data including children (that are theoretically infinite)
  function displayDataParent(item: itemType[], child?: boolean) {
    return item.map((option, key) => (
      <Box key={key} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          {option.icon}
          {option.text}
          {option.children && <ChevronRight />}
        </Box>
      </Box>
    ));
  }

  // maps through returned items, adds to new array
  async function mapItems(items: itemType[]) {
    // sets object to be filtered
    let newOptions = [...items];
    // maps new object
    newOptions.map((option, key) => {
      option.children ? mapItems(option.children) : null;
      option.categories.map((category) => {
        // if object exists in filter, adds to array
        currentFilters.forEach((filter) => {
          filter.text === category ? newItems.push(option) : null;
        });
        return;
      });
    });
  }

  // When currentFilters changes, resets options and rerenders options that match filter term.
  useEffect(() => {
    setFilteredOptions(filteredOptions.splice(0, filteredOptions.length));
    if (currentFilters.length === 0 && !currentSearch) {
      setFilteredOptions([...items]);
      setSearchedOptions([...items]);
    } else if (currentSearch) {
      mapItems(items)
        .then(() => setFilteredOptions([...newItems]))
        .then(() => filterData([...newItems]))
        .then(() => setSearchedOptions([...newSearchItems]));
    } else {
      mapItems(items)
        .then(() => setFilteredOptions([...newItems]))
        .then(() => setSearchedOptions([...newItems]));
    }
  }, [currentFilters]);

  //When the search value changes, filters data based on filters and search term
  useEffect(() => {
    if (currentSearch) {
      newSearchItems = [];
      filterData([...filteredOptions]).then(() => setSearchedOptions([...newSearchItems]));
    } else if (filteredOptions.length > 0) {
      setSearchedOptions([...filteredOptions]);
    } else {
      setFilteredOptions([...items]);
      setSearchedOptions([...items]);
    }
  }, [currentSearch]);

  // Returns each object in current options that includes the search term.
  async function filterData(options: menuItemType[]) {
    options.forEach((option, index) => {
      const val = option.text.toLowerCase().includes(currentSearch);
      if (val) {
        newSearchItems.push(option);
      }
    });
  }

  // alternative search filtering, iterates through all children
  async function filterDataChildren(options: menuItemType[]) {
    options.forEach((option, index) => {
      if (option.children) {
        filterData(option.children);
      }
      const val = option.text.toLowerCase().includes(currentSearch);
      if (val) {
        newSearchItems.push(option);
      }
    });
  }

  // sets state when search changed
  const handleDisplayedItemsSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCurrentSearch(event.target.value.toLowerCase());
  };

  return (
    <Box>
      <>
        <Typography variant="h4">Complex Filter</Typography>
        <Divider />
        <Box display="flex" flexDirection="row">
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
            // Having anchorEl & setAnchorEl here allows control over the popup appearing or disappearing
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            currentFilters={currentFilters}
            // Populated string array of all currently selected filters
            setCurrentFilters={setCurrentFilters}
            // Example of sending props to the button to change its style
            buttonProps={{ variant: 'contained', sx: { width: '130px', justifyContent: 'flex-start' } }}
            // Example of changing the menu style
            paperProps={{ style: { backgroundColor: 'white', left: '0px' } }}
            // Example of changing the title
            titleProps={{ padding: 4 }}
            listItemProps={{ color: 'secondary' }}
            handleDisplayedItemsSearch={handleDisplayedItemsSearch}
          />
        </Box>
        <br />
        {/* Example of mapping Chips for each filter with clear button */}

        {displayDataParent(searchedOptions)}
      </>
      <br />
    </Box>
  );
};

export default ComplexFilterDemo;
