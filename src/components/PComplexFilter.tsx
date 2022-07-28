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
import PIcon from '../images/PIcon';
import ComplexFilterPaper from './ComplexFilterPaper';
import { useEffect, useState } from 'react';
import { Search } from './Search';
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

// Props for filter component
export type PComplexFilterProps = {
  items: menuItemType[];
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
  selectVariant?: 'single' | 'multiple';
  title?: string;
  icon?: JSX.Element;
  label?: string;
  itemHeight?: number;
  maxItems?: number;
  searchable?: boolean;
  currentFilters?: menuItemType[];
  setCurrentFilters?: React.Dispatch<React.SetStateAction<menuItemType[]>>;
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
  clearChipProps?: ChipProps;
  handleDisplayedItemsSearch?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export function PComplexFilter({
  items = options,
  anchorEl,
  setAnchorEl,
  selectVariant = 'single',
  title,
  icon = <PIcon name="filterIcon" />,
  label = 'Filter',
  itemHeight = 50,
  maxItems = 10.5,
  searchable = false,
  currentFilters,
  setCurrentFilters,
  buttonProps,
  backButton = <ChevronLeft />,
  backButtonProps,
  titleProps,
  popperProps,
  paperProps,
  listItemProps,
  searchProps,
  chipProps,
  clearChipProps,
  handleDisplayedItemsSearch,
}: PComplexFilterProps) {
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [anchorElFilter, setAnchorElFilter] = useState<HTMLElement | null>(null);
  const [currentItems, setCurrentItems] = useState<menuItemType[]>(_.clone(items));
  const [filteredItems, setFilteredItems] = useState<menuItemType[]>(_.clone(currentItems));
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const history: menuItemType[][] = [items];
  const [itemsHistory, setItemsHistory] = useState(history);
  const [back, setBack] = useState(false);
  const [parent, setParent] = useState<menuItemType>();
  const valid = areChildrenOK(items);

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
        if (currentFilters && menuParent && currentFilters.includes(menuParent)) {
          const newState = currentFilters.filter((menu) => {
            return menu.text !== menuParent.text;
          });
          if (setCurrentFilters) {
            setCurrentFilters(newState);
          }
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
      item.selected = true;
      if (menuParent) {
        // if parent exists in current filters, alters parent
        if (currentFilters && currentFilters.includes(menuParent)) {
          const newState: menuItemType[] = currentFilters.map((filter) => {
            if (filter.text === menuParent.text) {
              return menuParent;
            }
            return filter;
          });
          if (setCurrentFilters) {
            setCurrentFilters(newState);
          }
          // if parent not exist, add to filters
        } else {
          if (setCurrentFilters) {
            setCurrentFilters((prev) => [...prev, menuParent]);
          }
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
        return element.text !== 'not found';
      });
      if (foundArray.length > 0) {
        setFilteredItems(foundArray);
      }
    }
  };

  // returns an item if included, or a dummy to be removed if not
  const mapFind = (item: menuItemType, text: string) => {
    return item.text.toLowerCase().includes(text) ? item : { text: 'not found' };
  };

  // when currentItems changes, sets Filtered items as well
  useEffect(() => {
    setFilteredItems(currentItems);
  }, [currentItems]);

  // clears all filters
  const handleClear = () => {
    if (setCurrentFilters) {
      setCurrentFilters([]);
    }
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
    if (setCurrentFilters) {
      setCurrentFilters((prev: menuItemType[]) => prev.filter((i) => i.text !== filter.text));
    }
    if (filter.children) {
      deSelect(filter.children);
    }
    handleClose();
    setAnchorElFilter(null);
  };

  // creates a label for each child selected
  const formatLabel = (filter: menuItemType) => {
    let breakline = false;
    let labelString = filter.text + ': ';
    filter.children?.forEach((child) => {
      if (child.selected && !breakline) {
        labelString = labelString + child.text;
        breakline = true;
      } else if (child.selected) {
        labelString = labelString + ', ' + child.text;
      }
    });
    return labelString;
  };

  // shows if child is selected
  const display = (filter: menuItemType) => {
    let exist: boolean = false;
    filter.children?.map((child) => {
      if (child.selected) {
        exist = true;
      }
    });
    return exist;
  };

  return valid ? (
    <Box
      sx={{ position: 'relative' }}
      aria-label="more"
      id="long-button"
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      display="flex"
      flexDirection="column"
      flex={1}
    >
      <Box display="flex" flexDirection="row" flex={1}>
        <>
          {handleDisplayedItemsSearch && (
            <Search fullWidth onChange={handleDisplayedItemsSearch} sx={{ paddingRight: 2 }} />
          )}
        </>
        <ClickAwayListener onClickAway={open ? handleClose : () => null}>
          <Box width="fit-content">
            <Button className="button" onClick={handleClick} {...buttonProps}>
              {icon}
              {label}
              <ChevronRight
                sx={{ transform: open ? 'rotate(270deg)' : 'rotate(90deg)', position: 'absolute', right: '10px' }}
              />
            </Button>
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
      <Box display={currentFilters && currentFilters[0] ? 'flex' : 'none'} paddingTop={2} flexDirection="row">
        {currentFilters?.map(
          (filter, index) =>
            filter.children &&
            display(filter) && (
              <ClickAwayListener onClickAway={() => handleChipClose(index)} key={index}>
                <Box key={index}>
                  <StyledChip
                    key={index}
                    label={
                      <Box display="flex" flexDirection="row" alignItems="center" textAlign="center">
                        <Typography variant="subtitle2" color="action.active" sx={{ paddingRight: 1 }}>
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
                    filterParent={parent}
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
                <Typography variant="subtitle2" color="primary.contrastText" sx={{ paddingRight: 1 }}>
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
