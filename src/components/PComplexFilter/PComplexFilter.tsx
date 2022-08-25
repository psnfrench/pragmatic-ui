import * as React from 'react';
import {
  Button,
  ButtonProps,
  PaperProps,
  styled,
  TextFieldProps,
  TypographyProps,
  Avatar,
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

// Styles Avatar for totalCount
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '24px',
  width: '24px',
  marginRight: theme.spacing(1),
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
  returnTree?: boolean;
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
  returnTree = true,
}: PComplexFilterProps) {
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [mainOpen, setMainOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<menuItemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItems, setCurrentItems] = useState<menuItemType[]>([...items]);
  const [filteredItems, setFilteredItems] = useState<menuItemType[]>([...currentItems]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const history: menuItemType[][] = [items];
  const [itemsHistory, setItemsHistory] = useState(history);
  const [back, setBack] = useState(false);
  const [parent, setParent] = useState<menuItemType>();
  const valid = areChildrenOK(items);
  const [totalCount, setTotalCount] = useState<number>();

  useEffect(() => {
    deSelect(items);
  }, []);

  const countSelected = (itemsToCount: menuItemType[], count?: number) => {
    if (!count) {
      count = 0;
    }
    for (const child of itemsToCount) {
      if (child.children) {
        const newCount: number = countSelected(child.children, count);
        if (newCount) {
          count = newCount;
        }
      } else if (child.selected) {
        count++;
      }
    }
    return count;
  };

  // triggers when filter button pressed. Opens/closes poppers
  const handleClick = (event: any) => {
    setOpen(!open);
    if (!open) {
      setMainOpen(true);
      setItemsHistory([items]);
      setAnchorEl(event.currentTarget);
    } else {
      handleClose();
    }
  };

  // resets variables for menu
  const handleClose = () => {
    setMainOpen(false);
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
  const handleChipClick = (item: menuItemType, index: number) => (event: any) => {
    if (index === currentIndex) {
      handleChipClose(index);
    } else if (anchorEl) {
      handleClose();
    } else {
      setItemsHistory([item.children as menuItemType[]]);
      setCurrentIndex(index);
      setCurrentTitle(item.text);
      setCurrentTitles([item.text]);
      setFilteredItems(item.children as menuItemType[]);
      setAnchorEl(event.currentTarget);
    }
  };

  // closes chip popper
  const handleChipClose = (index: number) => {
    if (index === currentIndex) {
      setCurrentIndex(-1);
      handleClose();
    }
  };

  const checkEmpty = (filter: menuItemType[]) => {
    const i = [true];
    filter.forEach((item) => {
      if (item.children) {
        i.push(...checkEmpty(item.children));
      } else if (item.selected) {
        i.push(false);
      }
    });
    return i;
  };

  // handles when a menu item is selected
  const handleSelected = (item: menuItemType, menuParent?: menuItemType) => {
    // if item already selected, deselects item
    if (item.selected) {
      item.selected = false;
      setCurrentFilterString(currentFilterString.filter((e) => e !== item.text));
      if (!returnTree && menuParent) {
        // checks parent contains no selected items
        const empty = checkEmpty(menuParent.children as menuItemType[]);
        // if parent empty, remove from array
        if (!empty.includes(false)) {
          if (menuParent && currentFilters.includes(menuParent)) {
            const newState = currentFilters.filter((menu) => {
              return menu.text !== menuParent.text;
            });
            if (!mainOpen) {
              setCurrentIndex(-1);
              handleClose();
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
      } else if (menuParent) {
        const i = items.find((j, index) => {
          if (mainOpen) {
            return j.text === currentTitles[1];
          } else {
            return j.text === currentTitles[0];
          }
        });
        if (i) {
          const empty = checkEmpty(i.children as menuItemType[]);
          if (!empty.includes(false)) {
            const newState = currentFilters.filter((menu) => {
              return menu.text !== (i as menuItemType).text;
            });
            if (!mainOpen) {
              setCurrentIndex(-1);
              handleClose();
            }
            setCurrentFilters(newState);
          } else {
            // if not empty, sets current filter to deselected
            if (setCurrentFilters) {
              setCurrentFilters((prev) =>
                prev.map((filter) =>
                  filter.text === (i as menuItemType).text ? (filter = i as menuItemType) : (filter = filter),
                ),
              );
            }
          }
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
          for (const child of menuParent.children as menuItemType[]) {
            if (child.selected) found.push(child);
          }

          if (found !== []) {
            for (const find of found) {
              setCurrentFilterString(currentFilterString.filter((e) => e !== find.text));
              find.selected = false;
            }
          }
        }
        item.selected = true;
        setCurrentFilterString((prev) => [...prev, item.text]);
        // if parent exists in current filters, alters parent. If returning tree, returns whole tree, else returns just parent.
        if (!returnTree) {
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
        } else {
          const i = itemsHistory[0].find((j, index) => j.text === currentTitles[1]);
          if (i && currentFilters.includes(i) && mainOpen) {
            const newState: menuItemType[] = currentFilters.map((filter) => {
              if (filter.text === (i as menuItemType).text) {
                return i as menuItemType;
              } else {
                return filter;
              }
            });

            setCurrentFilters(newState);
          } else if (i && mainOpen) {
            setCurrentFilters((prev) => [...prev, i as menuItemType]);
            // if parent not exist, add to filters
          } else {
            const _filters = [...currentFilters];
            const _index = _filters.findIndex((filter) => filter.text === (i as menuItemType).text);
            _filters[_index] = i as menuItemType;
            setCurrentFilters(_filters);
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
      for (const filter of _currentFilters) {
        if (filter.children) {
          const selectedObjects = getSelected(filter.children);
          filter.children = selectedObjects;
          filterArray.push(filter);
        } else {
          if (filter.selected) filterArray.push(filter);
        }
      }
    }

    if (setReturnedFilters) setReturnedFilters(filterArray);
  }, [currentFilters]);

  const getSelected = (filter: menuItemType[]) => {
    const i: menuItemType[] = [];
    filter.forEach((item) => {
      if (item.children) {
        const j = getSelected(item.children);
        item.children = j;
        i.push(item);
      } else if (item.selected) {
        i.push(item);
      }
    });
    return i;
  };

  // clears all filters
  const handleClear = () => {
    setCurrentFilters([]);
    setCurrentFilterString([]);
    deSelect(items);
    handleClose();
    setAnchorEl(null);
  };

  // deselects every item
  const deSelect = (itemsList: menuItemType[]) => {
    for (const item of itemsList) {
      if (item.children) {
        deSelect(item.children);
      } else if (item.selected) {
        item.selected = false;
        setCurrentFilterString(currentFilterString.filter((e) => e !== item.text));
      }
    }
  };

  // removes filter when Chip deleted
  const handleChipDelete = (filter: menuItemType) => {
    (filter.children as menuItemType[]).find((e) => e.selected === true);
    if (filter.children) {
      deSelect(filter.children);
    }
    setCurrentFilters((prev: menuItemType[]) => prev.filter((e) => e.text !== filter.text));

    handleClose();
    setAnchorEl(null);
  };

  // creates a label for each child selected
  const formatLabel = (filter: menuItemType) => {
    if (!returnTree) {
      let labelString = filter.text + ': ';
      const labelArray: string[] = [];
      for (const child of filter.children as menuItemType[]) {
        if (child.selected) {
          labelArray.push(child.text);
        }
      }
      labelString = labelString + labelArray.join(', ');
      return labelString;
    } else {
      return filter.text;
    }
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
              countSelected={countSelected}
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
            filter.children && (
              <ClickAwayListener onClickAway={() => handleChipClose(index)} key={index}>
                <Box key={index}>
                  <StyledChip
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
                        <StyledAvatar>
                          <Typography variant="body1" color="primary.contrastText">
                            {countSelected([filter])}
                          </Typography>
                        </StyledAvatar>
                        <ChevronRight
                          sx={{
                            transform: index === currentIndex ? 'rotate(270deg)' : 'rotate(90deg)',
                            fontSize: '1.3rem',
                          }}
                        />
                      </Box>
                    }
                    variant={index === currentIndex ? 'filled' : 'outlined'}
                    onClick={handleChipClick(filter, index)}
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
                        display: Boolean(anchorEl) && index === currentIndex ? 'block' : 'none',
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
                    open={anchorEl !== null && Boolean(anchorEl) && index === currentIndex}
                    anchorEl={anchorEl}
                    id={filter.text}
                    popperProps={popperProps}
                    paperProps={paperProps}
                    titleProps={titleProps}
                    currentTitle={currentTitle}
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
                    countSelected={countSelected}
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
