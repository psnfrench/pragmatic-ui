// @ts-nocheck
import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  ButtonProps,
  MenuListProps,
  PaperProps,
  styled,
  TextFieldProps,
  Typography,
  TypographyProps,
  Menu,
  MenuItem,
  MenuItemProps,
} from '@mui/material';
import { Search } from '../Search';
import { useEffect, useState } from 'react';
import { Cancel, ChevronLeft } from '@mui/icons-material';

const options = [
  { text: 'None' },
  { text: 'Atria' },
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

export type itemType = {
  text: string;
  icon?: React.ReactNode;
  children?: itemType[];
};

const StyledMenu = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
}));

const ITEM_HEIGHT = 48;

export type PComplexFilterProps = {
  items: itemType[];
  selectedItem?: string;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  selectVariant?: 'single' | 'multiple';
  title?: string;
  icon?: JSX.Element;
  label?: string;
  itemHeight?: number;
  handleSelected: (event: React.MouseEvent<HTMLLIElement>, item: string) => void;
  handleSearchChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleSearchSubmit?: React.FormEventHandler<HTMLDivElement> | undefined;
  currentFilters?: string[];
  setCurrentFilters?: React.Dispatch<React.SetStateAction<string[]>>;
  buttonProps?: ButtonProps;
  titleProps?: TypographyProps;
  menuPaperProps?: PaperProps;
  menuListProps?: MenuListProps;
  menuItemProps?: MenuItemProps;
  searchProps?: Omit<TextFieldProps, 'InputProps'>;
};

export function PComplexFilter({
  items = options,
  selectedItem,
  anchorEl,
  setAnchorEl,
  selectVariant = 'single',
  title,
  icon = <MoreVertIcon />,
  label = 'Options',
  itemHeight = ITEM_HEIGHT,
  handleSelected,
  handleSearchChange,
  handleSearchSubmit,
  currentFilters,
  setCurrentFilters,
  buttonProps,
  titleProps,
  menuPaperProps,
  menuListProps,
  menuItemProps,
  searchProps,
}: PComplexFilterProps) {
  const open = Boolean(anchorEl);
  const [searching, setSearching] = useState(false);
  const [currentItems, setCurrentItems] = useState(items);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const history: any[] = [items];
  const [itemsHistory, setItemsHistory] = useState(history);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    switch (selectVariant) {
      case 'single':
        setAnchorEl(null);
        return null;
      case 'multiple':
        setAnchorEl(null);
        setTimeout(function () {
          setCurrentItems(items);
          setCurrentTitle(title);
        }, 200);
        return null;
      default:
        return null;
    }
  };
  const handleSelectedInit = (event: React.MouseEvent<HTMLLIElement>, item: itemType) => {
    if (currentFilters?.includes(item.text) && setCurrentFilters) {
      setCurrentFilters((prev) => prev.filter((i) => i !== item.text));
      selectedItem = undefined;
    } else if (item.children && item.children.length > 0) {
      setCurrentTitles((prev) => [...prev, item.text]);
      setCurrentItems(item.children);
      setItemsHistory((itemsHistory) => [...itemsHistory, item.children]);
      setCurrentTitle(item.text);
    } else {
      handleSelected(event, item.text);
    }
  };

  const handleSearch = () => {
    setSearching(true);
  };

  const handleSearchBlur = () => {
    setSearching(false);
  };

  useEffect(() => {
    console.log('searching: ', searching);
  }, [searching]);

  function handleBack() {
    if (currentTitles && currentTitles.length > 0) {
      currentTitles.pop();
      const last = currentTitles[currentTitles.length - 1];
      setCurrentTitle(last);
    } else {
      setCurrentTitle(title);
    }
    itemsHistory.pop();
    console.log('itemsHistory: ', itemsHistory);

    const lastItem = itemsHistory[itemsHistory.length - 1];
    setCurrentItems(lastItem);
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) {
    if (setCurrentFilters) {
      setCurrentFilters((prev) => prev.filter((i) => i !== text));
      console.log(text);
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<any>) {
    console.log('Hi');
    searching ? event.stopPropagation() : null;
  }

  useEffect(() => {
    console.log(itemsHistory);
  }, [itemsHistory]);

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        {...buttonProps}
      >
        {icon}
        {label}
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
          style: {
            margin: 0,
          },
          ...menuListProps,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: itemHeight * 10.5,
            width: '40ch',
          },
          ...menuPaperProps,
        }}
        onKeyDown={(event) => handleKeyPress(event)}
      >
        <Typography variant="h6" textAlign="center" {...titleProps}>
          {currentTitle}
        </Typography>
        {currentItems != items ? (
          <Button
            sx={{
              padding: 2,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            onClick={handleBack}
          >
            <ChevronLeft />
          </Button>
        ) : null}
        {handleSearchChange ? (
          <Search
            onBlur={handleSearchBlur}
            onClick={handleSearch}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            {...searchProps}
          />
        ) : null}
        {currentItems && currentItems.length > 0
          ? currentItems.map((item, key) => (
              <MenuItem
                sx={{ width: '100%' }}
                key={item.text}
                selected={
                  (currentFilters && currentFilters.includes(item.text)) ||
                  (selectVariant === 'single' && item.text === selectedItem)
                }
                onClick={(event) => handleSelectedInit(event, item)}
                onKeyDown={(event) => handleKeyPress(event)}
                {...menuItemProps}
              >
                {currentFilters && setCurrentFilters && currentFilters.includes(item.text) ? (
                  <>
                    {item.icon}
                    {item.text}
                    <Button
                      sx={{
                        padding: 0,
                        position: 'absolute',
                        right: 0,
                      }}
                      onClick={(event) => handleDelete(event, item.text)}
                    >
                      <Cancel />
                    </Button>
                  </>
                ) : (
                  <>
                    {item.icon}
                    {item.text}
                  </>
                )}
              </MenuItem>
            ))
          : null}
      </Menu>
    </div>
  );
}
