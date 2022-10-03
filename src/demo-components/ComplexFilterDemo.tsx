import { ChevronRight } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { menuItemType, PComplexFilter } from '../components/PComplexFilter/PComplexFilter';
import PIcon from '../images/PIcon';

const options: menuItemType[] = [
  {
    text: 'Transport',
    secondary: 'Moving stuff',
    icon: <PIcon name="addIcon" />,
    children: [
      {
        text: 'Vehicle',
        children: [{ text: 'Car', selected: true }, { text: 'Truck' }, { text: 'Ute' }],
        multiple: false,
      },
      {
        text: 'Bike',
        children: [{ text: 'Mountain Bike' }, { text: 'Downhill Bike' }, { text: 'E-Bike' }],
        multiple: true,
      },
    ],
  },
  {
    text: 'Sport',
    children: [{ text: 'Rugby' }, { text: 'Football' }, { text: 'Basketball' }],
    multiple: true,
  },
  {
    text: 'Education',
    children: [{ text: 'Primary' }, { text: 'Secondary' }, { text: 'Tertiary' }],
    multiple: true,
  },
  {
    text: 'Hobbies',
    children: [{ text: 'Guitar' }, { text: 'Hiking' }, { text: 'Reading' }],
    multiple: true,
  },
  { text: 'Social', children: [{ text: 'People' }], multiple: true },
  {
    text: 'Travel',
    children: [
      {
        text: 'Countries',
        children: [{ text: 'South Africa' }, { text: 'France' }, { text: 'New Zealand' }],
        multiple: true,
      },
      {
        text: 'Activities',
        children: [{ text: 'Mountain Biking' }, { text: 'Whale Watching' }, { text: 'Visiting Holy Sites' }],
        multiple: true,
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
  { text: 'Fiat Bambina', categories: ['Car'] },
  {
    text: 'South Africa',
    categories: ['Travel', 'Countries'],
    children: [
      {
        text: 'Springboks',
        categories: ['Countries', 'Rugby'],
        children: [{ text: 'Siya Kolisi', categories: ['South Africa', 'Rugby', 'People'] }],
      },
    ],
  },
  {
    text: 'New Zealand',
    categories: ['New Zealand'],
    children: [
      {
        text: 'All Blacks',
        categories: ['New Zealand', 'Rugby'],
        children: [
          { text: 'Richie McCaw', categories: ['New Zealand', 'Rugby', 'People'] },
          { text: 'Conrad Smith', categories: ['New Zealand', 'Rugby', 'People'] },
          { text: 'Cory Vickers', categories: ['New Zealand', 'Football', 'People'] },
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
  const [currentFilterString, setCurrentFilterString] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>();
  const [filteredOptions, setFilteredOptions] = useState([...items]);
  const [searchedOptions, setSearchedOptions] = useState([...items]);
  const [returnedFilters, setReturnedFilters] = useState<menuItemType[]>();
  const newSearchItems = useRef<itemType[]>([]);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

  useEffect(() => {
    console.log(returnedFilters);
  }, [returnedFilters]);

  // Maps out all data including children (that are theoretically infinite)
  // function displayData(item: itemType[], child?: boolean) {
  //   return item.map((option, key) => (
  //     <Box key={key} display="flex" flexDirection="column">
  //       <Box display="flex" flexDirection="row">
  //         {child && '-'}
  //         {option.icon}
  //         {option.text}
  //       </Box>
  //       {option.children && (
  //         <Box display="flex" flexDirection="row" paddingLeft="12px">
  //           {displayData(option.children, true)}
  //         </Box>
  //       )}
  //     </Box>
  //   ));
  // }

  // Maps out all data including children (that are theoretically infinite)
  function displayDataParent(item: itemType[]) {
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

  // maps through returned items, adds to new array if matches all filters
  // async function mapItems(items: itemType[]) {
  //   // sets object to be filtered
  //   const newOptions = [...items];
  //   // maps new object
  //   newOptions.map((option, key) => {
  //     option.children ? mapItems(option.children) : null;
  //     let include = true;
  //     // if object exists in filter, adds to array
  //     currentFilterString.forEach((filter) => {
  //       const i = (option.categories as string[]).find((category) => category === filter);
  //       if (!i) {
  //         include = false;
  //       }
  //     });
  //     if (include) {
  //       newOptions.push(option);
  //     }
  //     return;
  //   });
  // }

  // maps through returned items, adds to new array if matches any
  // async function mapItemsAny(items: itemType[]) {
  //   // sets object to be filtered
  //   let newOptions = [...items];
  //   // maps new object
  //   newOptions.map((option, key) => {
  //     option.children ? mapItemsAny(option.children) : null;
  //     let include: boolean = false;
  //     // if object exists in filter, adds to array
  //     currentFilterString.forEach((filter) => {
  //       if ((option.categories as string[]).find((category) => category === filter)) {
  //         include = true;
  //       }
  //     });
  //     if (include) {
  //       newItems.push(option);
  //     }
  //     return;
  //   });
  // }

  // When currentFilters changes, resets options and rerenders options that match filter term.
  // useEffect(() => {
  //   setFilteredOptions(filteredOptions.splice(0, filteredOptions.length));
  //   if (currentFilterString.length === 0 && !currentSearch) {
  //     setFilteredOptions([...items]);
  //     setSearchedOptions([...items]);
  //   } else if (currentSearch) {
  //     mapItems([...items])
  //       .then(() => setFilteredOptions([...newItems]))
  //       .then(() => filterData([...newItems]))
  //       .then(() => setSearchedOptions([...newSearchItems]));
  //   } else {
  //     mapItems([...items])
  //       .then(() => setFilteredOptions([...newItems]))
  //       .then(() => setSearchedOptions([...newItems]));
  //   }
  // }, [currentFilterString]);

  const filterData = useCallback(
    async (options: menuItemType[]) => {
      options.forEach((option) => {
        const val = option.text.toLowerCase().includes(currentSearch as string);
        if (val) {
          newSearchItems.current.push(option);
        }
      });
    },
    [currentSearch],
  );

  //When the search value changes, filters data based on filters and search term
  useEffect(() => {
    if (currentSearch) {
      newSearchItems.current = [];
      filterData([...filteredOptions]).then(() => setSearchedOptions([...newSearchItems.current]));
    } else if (filteredOptions.length > 0) {
      setSearchedOptions([...filteredOptions]);
    } else {
      setFilteredOptions([...items]);
      setSearchedOptions([...items]);
    }
  }, [currentSearch, filterData, filteredOptions]);

  // alternative search filtering, iterates through all children
  // async function filterDataChildren(options: menuItemType[]) {
  //   options.forEach((option, index) => {
  //     if (option.children) {
  //       filterData(option.children);
  //     }
  //     const val = option.text.toLowerCase().includes(currentSearch as string);
  //     if (val) {
  //       newSearchItems.push(option);
  //     }
  //   });
  // }

  // sets state when search changed
  const handleDisplayedItemsSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCurrentSearch(event.target.value.toLowerCase());
  };

  // deselects every item
  // const deSelect = (itemsList: menuItemType[]) => {
  //   itemsList.forEach((item) => {
  //     item.children ? deSelect(item.children) : (item.selected = false);
  //   });
  // };

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
            // sets the title at the top of the menu
            title={'Filter Search'}
            // Having anchorEl & setAnchorEl here allows control over the popup appearing or disappearing
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            // Returns the current filter objects.
            // Handy for applying filter to data (useful when filtering multiple fields)
            setReturnedFilters={setReturnedFilters}
            // Enable this setting to return the whole returned filters object.
            // Without including this returns only the selected filters
            // returnAll
            // Populated string array of all currently selected filters (mostly useful when only filtering one field)
            currentFilterString={currentFilterString}
            setCurrentFilterString={setCurrentFilterString}
            // Example of sending props to the button to change its style
            buttonProps={{ variant: 'contained', sx: { width: '130px', justifyContent: 'flex-start' } }}
            // Example of changing the menu style
            paperProps={{ style: { backgroundColor: 'white', left: '0px' } }}
            // Example of changing the title
            titleProps={{ padding: 4 }}
            listItemProps={{ color: 'secondary' }}
            // Example Method of seraching with the searchbar in this component
            handleDisplayedItemsSearch={handleDisplayedItemsSearch}
            // use this if you would like to return the chip as top level,
            // as opposed to just one level above the filter.
            returnTree
            // Will show a Date Picker and set the value of this number
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
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
