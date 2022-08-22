import * as React from 'react';
import {
  Button,
  ButtonProps,
  PaperProps,
  styled,
  TextFieldProps,
  TypographyProps,
  Popper,
  PopperProps,
  ListProps,
  Box,
  ClickAwayListener,
  Chip,
  CheckboxProps,
  Typography,
  ChipProps,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import _ from 'lodash';
import PIcon from '../../images/PIcon';
import ComplexFilterPaper from './ComplexFilterPaper';
import { useEffect, useState } from 'react';
import { Search } from '../Search';
const options = [
  { text: 'None', categories: ['1'] },
  { text: 'Atria', categories: ['1'] },
  { text: 'Callisto', categories: ['1'] },
  { text: 'Dione', categories: ['1'] },
  { text: 'Ganymede', categories: ['1'] },
  { text: 'Hangouts Call', categories: ['1'] },
  { text: 'Luna', categories: ['1'] },
  { text: 'Oberon', categories: ['1'] },
  { text: 'Phobos', categories: ['1'] },
  { text: 'Pyxis', categories: ['1'] },
  { text: 'Sedna', categories: ['1'] },
  { text: 'Titania', categories: ['1'] },
  { text: 'Triton', categories: ['1'] },
  { text: 'Umbriel', categories: ['1'] },
];

// type of item in the menu
export type menuItemType = {
  text: string;
  secondary?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  children?: menuItemType[];
  multiple?: boolean;
};

// Styles chip
const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: '16px',
  width: 'fit-content',
  minHeight: '44px',
  borderRadius: '12px',
  color: theme.palette.action.active,
}));

// returns true if all children and childrens children are all leaves or all branches.
function areChildrenOK(children: menuItemType[]) {
  let countBranches = 0;
  let countLeaves = 0;
  for (const child of children) {
    if (child.children) {
      countBranches++;
      if (!areChildrenOK(child.children)) {
        return false;
      }
    } else {
      countLeaves++;
    }
  }
  return countBranches === 0 || countLeaves === 0;
}

// const [filters, setFilters] = useState<menuItemType[]>([]);

// Props for filter component
export type PComplexFilterProps = {
  items: menuItemType[];
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
  title?: string;
  buttonIcon?: JSX.Element;
  buttonLabel?: string;
  itemHeight?: number;
  maxItems?: number;
  searchable?: boolean;
  currentFilterString: string[];
  setCurrentFilterString: React.Dispatch<React.SetStateAction<string[]>>;
  setReturnedFilters?: React.Dispatch<React.SetStateAction<menuItemType[] | undefined>>;
  buttonProps?: ButtonProps;
  backButton?: React.ReactNode;
  backButtonProps?: ButtonProps;
  titleProps?: TypographyProps;
  popperProps?: PopperProps;
  paperProps?: PaperProps;
  listProps?: ListProps;
  listItemProps?: CheckboxProps;
  searchProps?: Omit<TextFieldProps, 'InputProps'>;
  chipProps?: ChipProps;
  chipTextProps?: TypographyProps;
  clearChipProps?: ChipProps;
  searchPlaceholder?: string;
  handleDisplayedItemsSearch?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  returnAll?: boolean;
};

export function PComplexFilter({
  items = options,
  anchorEl,
  setAnchorEl,
  title,
  buttonIcon = <PIcon name="filterIcon" />,
  buttonLabel = 'Filter',
  itemHeight = 50,
  maxItems = 10.5,
  searchable = false,
  currentFilterString,
  setCurrentFilterString,
  setReturnedFilters,
  buttonProps,
  backButton = <ChevronLeft />,
  backButtonProps,
  titleProps,
  popperProps,
  paperProps,
  listItemProps,
  searchProps,
  chipProps,
  chipTextProps,
  clearChipProps,
  searchPlaceholder,
  handleDisplayedItemsSearch,
  returnAll,
}: PComplexFilterProps) {
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [currentFilters, setCurrentFilters] = useState<menuItemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [anchorElFilter, setAnchorElFilter] = useState<HTMLElement | null>(null);
  const [currentItems, setCurrentItems] = useState<menuItemType[]>([...items]);
  const [filteredItems, setFilteredItems] = useState<menuItemType[]>([...currentItems]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const history: menuItemType[][] = [items];
  const [itemsHistory, setItemsHistory] = useState(history);
  const [back, setBack] = useState(false);
  const [parent, setParent] = useState<menuItemType>();
  const valid = areChildrenOK(items);

  useEffect(() => {
    deSelect(items);
  }, []);

  // triggers when filter button pressed. Opens/closes poppers
  const handleClick = (event: any) => {
    setOpen(!open);
    if (!open) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  // resets variables for menu
  const handleClose = () => {
    setBack(false);
    setOpen(false);
    setAnchorEl(null);
    setCurrentTitle(title);
    setCurrentTitles([title]);
    setCurrentItems([...items]);
    setFilteredItems([...currentItems]);
    setItemsHistory([items]);
  };

  // shows/hides popper for each chip
  const handleChipClick = (children: menuItemType[], index: number) => (event: any) => {
    if (index === currentIndex) {
      handleChipClose(index);
    } else if (anchorEl) {
      handleClose();
    } else {
      setAnchorElFilter(event.currentTarget);
      setCurrentIndex(index);
      setFilteredItems(children);
    }
  };

  // closes chip popper
  const handleChipClose = (index: number) => {
    if (index === currentIndex) {
      setAnchorElFilter(null);
      setCurrentIndex(-1);
      handleClose();
    }
  };

  // handles when a menu item is selected
  const handleSelected = (item: menuItemType, menuParent?: menuItemType) => {
    // if item already selected, deselects item
    if (item.selected) {
      item.selected = false;
      setCurrentFilterString(currentFilterString.filter((e) => e !== item.text));
      // checks parent contains no selected items
      const empty =
        menuParent &&
        menuParent.children &&
        menuParent.children.map((child) => {
          if (child.selected) {
            return true;
          }
          return false;
        });
      // if parent empty, remove from array
      if (empty?.includes(true) === false) {
        if (menuParent && currentFilters.includes(menuParent)) {
          const newState = currentFilters.filter((menu) => {
            return menu.text !== menuParent.text;
          });
          setCurrentFilters(newState);
          setCurrentIndex(-1);
          handleClose();
        }
      } else {
        // if not empty, sets current filter to deselected
        if (menuParent && setCurrentFilters) {
          setCurrentFilters((prev) =>
            prev.map((filter) => (filter.text === menuParent.text ? (filter = menuParent) : (filter = filter))),
          );
        }
      }
      // if item has children
    } else if (item.children && item.children.length > 0) {
      // adds parent name to title array
      setCurrentTitles((prev) => [...prev, item.text]);
      // changes current items to children
      setCurrentItems(item.children);
      // adds children to itemHistory to give ability for backtracking
      setItemsHistory([...itemsHistory, item.children]);
      // sets the current title
      setCurrentTitle(item.text);
      // sets the parent
      setParent(item);
      // enables going back
      setBack(true);
    } else {
      // selects item
      if (menuParent) {
        if (!menuParent.multiple) {
          const found: menuItemType[] = [];
          (menuParent.children as menuItemType[]).forEach((child, index) =>
            child.selected ? found.push(child) : null,
          );
          if (found !== []) {
            found.forEach((find) => {
              setCurrentFilterString(currentFilterString.filter((e) => e !== find.text));
              find.selected = false;
            });
          }
        }
        item.selected = true;
        setCurrentFilterString((prev) => [...prev, item.text]);
        // if parent exists in current filters, alters parent
        if (currentFilters.includes(menuParent)) {
          const newState: menuItemType[] = currentFilters.map((filter) => {
            if (filter.text === menuParent.text) {
              return menuParent;
            }
            return filter;
          });
          setCurrentFilters(newState);
          // if parent not exist, add to filters
        } else {
          setCurrentFilters((prev) => [...prev, menuParent]);
        }
      }
    }
  };

  // sets menu to previous state (i.e one step up the tree)
  function handleBack() {
    if (currentTitles && currentTitles.length > 0) {
      currentTitles.pop();
      const last = currentTitles[currentTitles.length - 1];
      setCurrentTitle(last);
      currentTitles.at(-1) === title ? setBack(false) : setBack(true);
    } else {
      setCurrentTitle(title);
    }
    itemsHistory.pop();
    const lastItem = itemsHistory[itemsHistory.length - 1];
    setCurrentItems(lastItem);
  }

  // handles the search event and returns all current items that include the search term
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    menus?: menuItemType[],
  ) => {
    if (menus) {
      let foundArray = menus.map((item) => mapFind(item, event.target.value.toLowerCase()));
      foundArray = foundArray.filter((element) => {
        return element !== undefined;
      });
      if (foundArray.length > 0) {
        setFilteredItems(foundArray as menuItemType[]);
      }
    }
  };

  // returns an item if included, or a dummy to be removed if not
  const mapFind = (item: menuItemType, text: string) => {
    if (item.text.toLowerCase().includes(text)) {
      return item;
    }
  };

  // when currentItems changes, sets Filtered items as well
  useEffect(() => {
    setFilteredItems(currentItems);
  }, [currentItems]);

  // when currentItems changes, sets Filtered items as well
  useEffect(() => {
    const _currentFilters = _.cloneDeep(currentFilters);
    let filterArray: menuItemType[] = [];

    if (returnAll) {
      filterArray = _currentFilters;
    } else {
      _currentFilters.forEach((filter) => {
        if (filter.children) {
          const childrenArray: menuItemType[] = [];
          filter.children.forEach((child) => {
            if (child.selected) childrenArray.push(child);
          });
          filter.children = childrenArray;
          filterArray.push(filter);
        } else {
          if (filter.selected) filterArray.push(filter);
        }
      });
    }

    setReturnedFilters && setReturnedFilters(filterArray);
  }, [currentFilters]);

  // clears all filters
  const handleClear = () => {
    setCurrentFilters([]);
    setCurrentFilterString([]);
    deSelect(items);
    handleClose();
    setAnchorElFilter(null);
  };

  // deselects every item
  const deSelect = (itemsList: menuItemType[]) => {
    itemsList.forEach((item) => {
      item.children ? deSelect(item.children) : (item.selected = false);
    });
  };

  // removes filter when Chip deleted
  const handleChipDelete = (filter: menuItemType) => {
    const i = (filter.children as menuItemType[]).find((e) => e.selected === true);
    setCurrentFilterString(currentFilterString.filter((e) => e !== (i as menuItemType).text));
    setCurrentFilters((prev: menuItemType[]) => prev.filter((e) => e.text !== filter.text));
    if (filter.children) {
      deSelect(filter.children);
    }
    handleClose();
    setAnchorElFilter(null);
  };

  // creates a label for each child selected
  const formatLabel = (filter: menuItemType) => {
    let labelString = filter.text + ': ';
    const labelArray: string[] = [];
    filter.children?.forEach((child) => {
      if (child.selected) {
        labelArray.push(child.text);
      }
    });
    labelString = labelString + labelArray.join(', ');
    return labelString;
  };

  // shows if child is selected
  const chipSelected = (filter: menuItemType) => {
    return (filter.children || []).some((child) => child.selected);
  };

  return valid ? (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box display="flex" flexDirection="row" flex={1}>
        <>
          {handleDisplayedItemsSearch && (
            <Search
              fullWidth
              placeholderText={searchPlaceholder}
              onChange={handleDisplayedItemsSearch}
              sx={{ paddingRight: 2 }}
            />
          )}
        </>
        <ClickAwayListener onClickAway={open ? handleClose : () => null}>
          <Box width="fit-content">
            <Button className="button" onClick={handleClick} {...buttonProps}>
              {buttonIcon}
              {buttonLabel}
              <ChevronRight
                sx={{ transform: open ? 'rotate(270deg)' : 'rotate(90deg)', position: 'absolute', right: '10px' }}
              />
            </Button>
            <Box
              sx={{
                zIndex: 999999,
                position: 'relative',
                mt: '12px',
                '&::before': {
                  backgroundColor: 'white',
                  content: '""',
                  display: open ? 'block' : 'none',
                  position: 'absolute',
                  width: 16,
                  height: 16,
                  top: -8,
                  transform: 'rotate(225deg)',
                  left: 'calc(50% - 8px)',
                  boxShadow: '3px 3px 6px -3px rgba(0,0,0,0.2)',
                },
              }}
            />
            <ComplexFilterPaper
              open={open}
              anchorEl={anchorEl}
              id="long-menu"
              paperProps={paperProps}
              titleProps={titleProps}
              currentTitle={currentTitle}
              back={back}
              backButton={backButton}
              backButtonProps={backButtonProps}
              searchable={searchable}
              handleBack={handleBack}
              handleSearchChange={(event) => handleSearchChange(event, currentItems)}
              handleSelected={handleSelected}
              filteredItems={filteredItems}
              filterParent={parent}
              itemHeight={itemHeight}
              maxItems={maxItems}
              listItemProps={listItemProps}
              searchProps={searchProps}
            />
          </Box>
        </ClickAwayListener>
      </Box>
      <Box
        display={currentFilterString.length > 0 ? 'flex' : 'none'}
        paddingTop={2}
        flexDirection="row"
        flexWrap="wrap"
      >
        {currentFilters?.map(
          (filter, index) =>
            filter.children &&
            chipSelected(filter) && (
              <ClickAwayListener onClickAway={() => handleChipClose(index)} key={index}>
                <Box key={index}>
                  <StyledChip
                    key={index}
                    label={
                      <Box display="flex" flexDirection="row" alignItems="center" textAlign="center">
                        <Typography
                          variant="subtitle2"
                          color="action.active"
                          sx={{ paddingRight: 1 }}
                          {...chipTextProps}
                        >
                          {formatLabel(filter)}
                        </Typography>
                        <ChevronRight
                          sx={{
                            transform: index === currentIndex ? 'rotate(270deg)' : 'rotate(90deg)',
                            fontSize: '1.3rem',
                          }}
                        />
                      </Box>
                    }
                    variant={index === currentIndex ? 'filled' : 'outlined'}
                    onClick={handleChipClick(filter.children, index)}
                    deleteIcon={
                      <Box onClick={() => handleChipDelete(filter)}>
                        <PIcon name="crossSmallIcon" />
                      </Box>
                    }
                    onDelete={() => handleChipDelete(filter)}
                    {...chipProps}
                  />
                  <Box
                    sx={{
                      zIndex: 999999,
                      position: 'relative',
                      mt: '12px',
                      '&::before': {
                        backgroundColor: 'white',
                        content: '""',
                        display: Boolean(anchorElFilter) && index === currentIndex ? 'block' : 'none',
                        position: 'absolute',
                        width: 16,
                        height: 16,
                        top: -8,
                        transform: 'rotate(225deg)',
                        left: 'calc(50% - 8px)',
                        boxShadow: '3px 3px 6px -3px rgba(0,0,0,0.2)',
                      },
                    }}
                  />
                  <ComplexFilterPaper
                    open={Boolean(anchorElFilter) && index === currentIndex}
                    anchorEl={anchorElFilter}
                    id={filter.text}
                    popperProps={popperProps}
                    paperProps={paperProps}
                    titleProps={titleProps}
                    currentTitle={filter.text}
                    back={back}
                    backButton={backButton}
                    backButtonProps={backButtonProps}
                    searchable={searchable}
                    handleBack={handleBack}
                    handleSearchChange={(event) => handleSearchChange(event, filter.children)}
                    handleSelected={handleSelected}
                    filteredItems={filteredItems}
                    filterParent={filter}
                    itemHeight={itemHeight}
                    maxItems={maxItems}
                    listItemProps={listItemProps}
                    searchProps={searchProps}
                  />
                </Box>
              </ClickAwayListener>
            ),
        )}
        {currentFilters && currentFilters[0] && (
          <>
            <StyledChip
              color="primary"
              label={
                <Typography
                  variant="subtitle2"
                  color="primary.contrastText"
                  sx={{ paddingRight: 1 }}
                  {...chipTextProps}
                >
                  Clear All
                </Typography>
              }
              onClick={handleClear}
              onDelete={handleClear}
              {...clearChipProps}
            />
            <br />
            <br />
          </>
        )}
      </Box>
    </Box>
  ) : (
    <Typography color="red" variant="h6">
      Your data for the filter is invalid. Ensure that children of each object are all leaves or branches.
    </Typography>
  );
}
