/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  ButtonProps,
  PaperProps,
  styled,
  TextFieldProps,
  TypographyProps,
  PopperProps,
  ListProps,
  Box,
  ClickAwayListener,
  Chip,
  CheckboxProps,
  Typography,
  ChipProps,
  FilledInputProps,
  TextField,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import _ from 'lodash';
import ComplexFilterPaper from './ComplexFilterPaper';
import React, { useCallback, useEffect, useState } from 'react';
import { Search } from '../Search';
import PIcon from '../../images/PIcon';
import { theme } from '../../constants/theme';
const InitialOptions = [
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

// type of option in the menu
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  top: theme.spacing(-1.5),
  right: '0px',
}));

// // Styles Avatar for totalCount
// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   height: '24px',
//   width: '24px',
//   marginRight: theme.spacing(1),
// }));

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
  menuItems: menuItemType[];
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
  activeFilters: menuItemType[];
  setActiveFilters?: React.Dispatch<React.SetStateAction<menuItemType[]>>;
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
  startDate?: number | undefined;
  setStartDate?: React.Dispatch<React.SetStateAction<number | undefined>>;
  endDate?: number | undefined;
  setEndDate?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export function PComplexFilter({
  menuItems = InitialOptions,
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
  activeFilters,
  setActiveFilters,
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: PComplexFilterProps) {
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [mainOpen, setMainOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<menuItemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [copyOfItems, setCopyOfItems] = useState<menuItemType[]>([]);
  const [currentItems, setCurrentItems] = useState<menuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<menuItemType[]>([...currentItems]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const history: menuItemType[][] = [menuItems];
  const [menuItemsHistory, setMenuItemsHistory] = useState(history);
  const [back, setBack] = useState(false);
  const [parent, setParent] = useState<menuItemType>();
  const [localEndDate, setLocalEndDate] = useState(_.cloneDeep(endDate));
  const [localStartDate, setLocalStartDate] = useState(_.cloneDeep(startDate));
  // {
  //   text: currentTitle ? currentTitle : '',
  //   children: menuItems,
  //   multiple: true,
  // }
  const valid = areChildrenOK(_.cloneDeep(menuItems));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      menuItems = InitializeComponent(menuItems, activeFilters);
      setCopyOfItems(_.cloneDeep(menuItems));
      setCurrentItems(menuItems);
      setLoading(false);
    }
  }, []);

  const InitializeComponent = (options: menuItemType[], filters: menuItemType[]) => {
    const x: menuItemType[] = [];
    for (const option of options) {
      for (const filter of filters) {
        if (option.text === filter.text && option.children && filter.children) {
          option.children = InitializeComponent(option.children, filter.children);
        } else if (option.text === filter.text) {
          option.selected = true;
        }
      }
      x.push(option);
    }
    return x;
  };

  useEffect(() => {
    if (!loading) generateCurrentFilters();
  }, [copyOfItems, loading]);

  const generateCurrentFilters = () => {
    const arr: menuItemType[] = [];
    copyOfItems.forEach((menuItem) => {
      if (menuItem && menuItem.children && checkEmpty(menuItem.children).includes(false)) {
        arr.push(menuItem);
      }
    });
    setCurrentFilters(arr);
    generateReturnedFilters(_.cloneDeep(arr));
  };

  const generateReturnedFilters = (filters: menuItemType[]) => {
    let filterArray: menuItemType[] = [];
    if (returnAll) {
      filterArray = filters;
    } else {
      for (const filter of filters) {
        if (filter.children) {
          const selectedObjects = getSelected(filter.children);
          filter.children = selectedObjects;
          filterArray.push(filter);
        } else {
          if (filter.selected) {
            filterArray.push(filter);
            setCurrentFilterString((prev) => [...prev, filter.text]);
          }
        }
      }
    }
    if (filterArray.length < activeFilters.length) handleClose();
    if (setActiveFilters) setActiveFilters(filterArray);
  };

  // deselects every menuItem
  const deSelect = useCallback(
    (menuItemsList: menuItemType[]) => {
      for (const menuItem of menuItemsList) {
        if (menuItem.children) {
          deSelect(menuItem.children);
        } else if (menuItem.selected) {
          menuItem.selected = false;
          setCurrentFilterString(currentFilterString.filter((e) => e !== menuItem.text));
        }
      }
    },
    [currentFilterString, setCurrentFilterString],
  );

  const countSelected = (menuItemsToCount: menuItemType[], count?: number) => {
    if (!count) {
      count = 0;
    }
    for (const child of menuItemsToCount) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setOpen(!open);
    if (!open) {
      setMainOpen(true);
      setMenuItemsHistory([menuItems]);
      setAnchorEl(event.currentTarget);
    } else {
      handleClose();
    }
  };

  // resets variables for menu
  const handleClose = useCallback(() => {
    setMainOpen(false);
    setBack(false);
    setOpen(false);
    setAnchorEl(null);
    setCurrentTitle(title);
    setCurrentTitles([title]);
    setCurrentItems(menuItems);
    setFilteredItems([...currentItems]);
    setMenuItemsHistory([menuItems]);
  }, [currentItems, menuItems, setAnchorEl, title]);

  // shows/hides popper for each chip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChipClick = (menuItem: menuItemType, index: number) => (event: any) => {
    if (index === currentIndex) {
      handleChipClose(index);
    } else if (anchorEl) {
      handleClose();
    } else {
      setParent(menuItem);
      setMenuItemsHistory([menuItem.children as menuItemType[]]);
      setCurrentIndex(index);
      setCurrentTitle(menuItem.text);
      setCurrentTitles([menuItem.text]);
      setFilteredItems(menuItem.children as menuItemType[]);
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

  const checkEmpty = useCallback((filter: menuItemType[]) => {
    const i = [true];
    filter.forEach((menuItem) => {
      if (menuItem.children) {
        i.push(...checkEmpty(menuItem.children));
      } else if (menuItem.selected) {
        i.push(false);
      }
    });
    return i;
  }, []);

  const SelectItem = (_menuItems: menuItemType[], text: string, select: boolean, parentText?: string) => {
    return _menuItems.map((item) => {
      if (item.text === text && parentText === currentTitle) {
        item.selected = select;
      } else if (item.children) {
        item.children = SelectItem(item.children, text, select, item.text);
      }
      return item;
    });
  };

  // handles when a menu menuItem is selected
  const handleSelected = useCallback(
    (menuItem: menuItemType, menuParent?: menuItemType) => {
      // if menuItem already selected, deselects menuItem
      if (menuItem.selected) {
        menuItem.selected = false;
        setCopyOfItems(SelectItem(menuItems, menuItem.text, false, menuParent?.text));
        setCurrentFilterString(currentFilterString.filter((e) => e !== menuItem.text));
        // if menuItem has children
      } else if (menuItem.children && menuItem.children.length > 0) {
        // adds parent name to title array
        setCurrentTitles((prev) => [...prev, menuItem.text]);
        // changes current menuItems to children
        setCurrentItems(menuItem.children);
        // adds children to menuItemHistory to give ability for backtracking
        setMenuItemsHistory([...menuItemsHistory, menuItem.children]);
        // sets the current title
        setCurrentTitle(menuItem.text);
        // sets the parent
        setParent(menuItem);
        // enables going back
        setBack(true);
      } else {
        // selects menuItem
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
          menuItem.selected = true;
          setCopyOfItems(SelectItem(menuItems, menuItem.text, true, menuParent?.text));
          setCurrentFilterString((prev) => [...prev, menuItem.text]);
        }
      }
    },
    [
      currentFilterString,
      currentFilters,
      currentTitles,
      handleClose,
      menuItems,
      menuItemsHistory,
      mainOpen,
      returnTree,
      setCurrentFilterString,
    ],
  );

  // sets menu to previous state (i.e one step up the tree)
  function handleBack() {
    if (currentTitles && currentTitles.length > 0) {
      currentTitles.pop();
      const last = currentTitles[currentTitles.length - 1];
      setCurrentTitle(last);
      currentTitles.length === 1 ? setBack(false) : setBack(true);
    } else {
      setCurrentTitle(title);
    }
    menuItemsHistory.pop();
    const lastItem = menuItemsHistory[menuItemsHistory.length - 1];
    setCurrentItems(lastItem);
  }

  // handles the search event and returns all current menuItems that include the search term
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    menus?: menuItemType[],
  ) => {
    if (menus) {
      let foundArray = menus.map((menuItem) => mapFind(menuItem, event.target.value.toLowerCase()));
      foundArray = foundArray.filter((element) => {
        return element !== undefined;
      });
      if (foundArray.length > 0) {
        setFilteredItems(foundArray as menuItemType[]);
      }
    }
  };

  // returns an menuItem if included
  const mapFind = (menuItem: menuItemType, text: string) => {
    if (menuItem.text.toLowerCase().includes(text)) {
      return menuItem;
    }
  };

  // when currentItems changes, sets Filtered menuItems as well
  useEffect(() => {
    if (!loading) setFilteredItems(currentItems);
  }, [currentItems, loading]);

  const getSelected = useCallback((filter: menuItemType[]) => {
    const i: menuItemType[] = [];
    filter.map((menuItem) => {
      if (menuItem.selected) i.push(menuItem);
      else if (menuItem.children) {
        menuItem.children = getSelected(menuItem.children);
        i.push(menuItem);
      }
    });
    return i;
  }, []);

  // clears all filters
  const handleClear = () => {
    setCurrentFilters([]);
    setCurrentFilterString([]);
    deSelect(menuItems);
    generateCurrentFilters();
    handleClose();
    setAnchorEl(null);
  };

  // removes filter when Chip deleted
  const handleChipDelete = (filter: menuItemType) => {
    (filter.children as menuItemType[]).find((e) => e.selected === true);
    if (filter.children) {
      deSelect(filter.children);
    }
    // setCurrentFilters((prev: menuItemType[]) => prev.filter((e) => e.text !== filter.text));
    generateCurrentFilters();

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
      const counter = countSelected(filter.children as menuItemType[]);
      return filter.text + ':  ' + counter + (counter === 1 ? ' filter' : ' filters');
    }
  };

  // removes the time from the date pickers
  function removeTime(date: Date | number) {
    const _date = new Date(date);
    return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate());
  }

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
      <Box display="flex" flexDirection="row" flex={1}>
        <Box display={currentFilters.length > 0 ? 'none' : 'flex'} paddingTop={2} flex={1} />
        <Box
          display={currentFilters.length > 0 ? 'flex' : 'none'}
          paddingTop={2}
          flexDirection="row"
          flexWrap="wrap"
          flex={1}
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
                          {/* <StyledAvatar sx={{ display: returnTree ? 'inline-flex' : 'none' }}>
                          <Typography variant="body1" color="primary.contrastText">
                            {countSelected([filter])}
                          </Typography>
                        </StyledAvatar> */}
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
        {setStartDate && (
          <Box display="flex" flexDirection="column" marginLeft={theme.spacing(2)} position="relative">
            <DatePicker
              label={<Typography variant="caption">Start Date:</Typography>}
              value={startDate}
              disabled={startDate ? false : true}
              onChange={(e) => {
                setStartDate(removeTime(e as number).getTime());
                setLocalStartDate(removeTime(e as number).getTime());
              }}
              renderInput={({ InputProps, ...params }) => {
                (InputProps as Partial<FilledInputProps>).disableUnderline = true;
                (InputProps as Partial<FilledInputProps>).sx = { width: '140px' };
                (InputProps as Partial<FilledInputProps>).inputProps = { sx: { padding: '8px' } };
                return (
                  <TextField
                    variant="filled"
                    value={new Intl.DateTimeFormat('en-NZ', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    }).format(startDate)}
                    InputProps={{ ...InputProps }}
                    {...params}
                  />
                );
              }}
            />
            <StyledIconButton
              onClick={() => {
                startDate ? setStartDate(undefined) : setStartDate(localStartDate);
              }}
              sx={{
                position: 'absolute',
                color: startDate ? 'red' : 'green',
                transform: !startDate ? 'rotate(45deg) !important' : 'rotate(0deg)',
              }}
            >
              <PIcon name="crossSmallIcon" />
            </StyledIconButton>
          </Box>
        )}
        {setEndDate && (
          <Box display="flex" flexDirection="column" marginLeft={theme.spacing(2)} position="relative">
            <DatePicker
              label={<Typography variant="caption">End Date:</Typography>}
              value={endDate}
              disabled={endDate ? false : true}
              onChange={(e) => {
                setEndDate(removeTime(e as number).getTime() + 24 * 60 * 60 * 1000 - 1);
                setLocalEndDate(removeTime(e as number).getTime() + 24 * 60 * 60 * 1000 - 1);
              }}
              renderInput={({ InputProps, ...params }) => {
                (InputProps as Partial<FilledInputProps>).disableUnderline = true;
                (InputProps as Partial<FilledInputProps>).sx = { width: '140px' };
                (InputProps as Partial<FilledInputProps>).inputProps = { sx: { padding: '8px' } };
                return (
                  <TextField
                    variant="filled"
                    value={new Intl.DateTimeFormat('en-NZ', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    }).format(endDate)}
                    InputProps={{ ...InputProps }}
                    {...params}
                  />
                );
              }}
            />
            <StyledIconButton
              onClick={() => {
                endDate ? setEndDate(undefined) : setEndDate(localEndDate);
              }}
              sx={{
                position: 'absolute',
                color: endDate ? 'red' : 'green',
                transform: !endDate ? 'rotate(45deg) !important' : 'rotate(0deg)',
              }}
            >
              <PIcon name="crossSmallIcon" />
            </StyledIconButton>
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Typography color="red" variant="h6">
      Your data for the filter is invalid. Ensure that children of each object are all leaves or branches.
    </Typography>
  );
}
