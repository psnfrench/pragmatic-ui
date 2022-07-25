import * as React from 'react';
import {
  Button,
  ButtonProps,
  PaperProps,
  styled,
  TextFieldProps,
  Typography,
  TypographyProps,
  Popper,
  ListItem,
  List,
  PopperProps,
  ListProps,
  Paper,
  ListItemProps,
  Box,
  ClickAwayListener,
} from '@mui/material';
import { Search } from './Search';
import { useEffect, useState } from 'react';
import { Cancel, ChevronLeft, ChevronRight, SignalWifiStatusbarNull } from '@mui/icons-material';
import PIcon from '../images/PIcon';
import { forEach } from 'lodash';
import _ from 'lodash';

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

export type menuItemType = {
  text: string;
  icon?: React.ReactNode;
  children?: menuItemType[];
};

export type PComplexFilterProps = {
  items: menuItemType[];
  selectedItem?: menuItemType;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
  selectVariant?: 'single' | 'multiple';
  title?: string;
  icon?: JSX.Element;
  label?: string;
  itemHeight?: number;
  maxItems?: number;
  handleSelected: (event: React.MouseEvent<HTMLLIElement>, item?: menuItemType, parent?: menuItemType) => void;
  searchable?: boolean;
  currentFilters?: menuItemType[];
  setCurrentFilters?: React.Dispatch<React.SetStateAction<any[]>>;
  buttonProps?: ButtonProps;
  backButton?: React.ReactNode;
  backButtonProps?: ButtonProps;
  titleProps?: TypographyProps;
  popperProps?: PopperProps;
  paperProps?: PaperProps;
  listProps?: ListProps;
  listItemProps?: ListItemProps;
  placeholderText?: string;
  searchProps?: Omit<TextFieldProps, 'InputProps'>;
};

export function PComplexFilterV2({
  items = options,
  selectedItem,
  anchorEl,
  setAnchorEl,
  selectVariant = 'single',
  title,
  icon = <PIcon name="filterIcon" />,
  label = 'Filter',
  itemHeight = 40,
  maxItems = 10.5,
  handleSelected,
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
  placeholderText,
  searchProps,
}: PComplexFilterProps) {
  const open = Boolean(anchorEl);
  const [opened, setOpened] = useState(false);
  const [currentItems, setCurrentItems] = useState<menuItemType[]>([...items]);
  const [filteredItems, setFilteredItems] = useState<menuItemType[]>([...currentItems]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTitles, setCurrentTitles] = useState([title]);
  const [itemsHistory, setItemsHistory] = useState([items]);
  const [back, setBack] = useState(false);
  const [parent, setParent] = useState<menuItemType>();

  const handleClick = (event: any) => {
    setOpened(!opened);
    if (!opened) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setBack(false);
    setOpened(false);
    setAnchorEl(null);
    setCurrentTitle(title);
    setCurrentTitles([title]);
    setCurrentItems([...items]);
    setFilteredItems([...currentItems]);
    setItemsHistory([items]);
    console.log('items: ', currentItems);
  };

  const handleSelectedInit = (event: React.MouseEvent<HTMLLIElement>, item: menuItemType) => {
    if (currentFilters?.includes(item) && setCurrentFilters) {
      setCurrentFilters((prev) => prev.filter((i) => i !== item));
      selectedItem = undefined;
    } else if (item.children && item.children.length > 0) {
      setCurrentTitles((prev) => [...prev, item.text]);
      setCurrentItems(item.children);
      setItemsHistory([...itemsHistory, item.children]);
      setCurrentTitle(item.text);
      setBack(true);
      if (itemsHistory.length === 1) {
        let newItem = _.cloneDeep(item);
        // newItem.children.filter(function (value) {
        //   return value.text !== item.text;
        // });
        // newItem.children.splice(0, item.children.length);
        setParent(newItem);
      } else {
        const newParent = _.cloneDeep(parent);
        if (newParent.children.length > 0) {
          recursive(newParent, item);
          for (var i = 0; i < newParent.children.length; i++) {
            if (newParent.children[i].text !== item.text) {
              newParent.children.splice(i, 1);
            }
          }
          console.log('newParent: ', newParent);
        } else {
          newParent.children.push(item);
        }
        setParent(newParent);
      }
    } else {
      handleSelected(event, item, parent);
    }
  };

  function recursive(newParent: menuItemType, item: menuItemType) {
    if (newParent.children.length > 0) {
      if (newParent.children[0].children) {
        forEach(newParent.children, function (value) {
          const node = recursive(value, item);
          if (node)
            return {
              text: newParent.text,
              icon: newParent.icon,
              children: newParent.children,
            };
        });
      } else {
        for (var i = 0; i < newParent.children.length; i++) {
          if (newParent.children[i].text !== item.text) {
            newParent.children.splice(i, 1);
          }
        }
      }

      console.log('newParent: ', newParent);
    } else {
      return undefined;
    }
  }

  function handleBack() {
    if (currentTitles && currentTitles.length > 0) {
      currentTitles.pop();
      const last = currentTitles[currentTitles.length - 1];
      setCurrentTitle(last);
      currentTitles.at(-1) == title ? setBack(false) : null;
    } else {
      setCurrentTitle(title);
    }
    itemsHistory.pop();
    const lastItem = itemsHistory[itemsHistory.length - 1];
    setCurrentItems(lastItem);
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: menuItemType) {
    if (setCurrentFilters) {
      setCurrentFilters((prev) => prev.filter((i) => i !== item));
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let foundArray = currentItems.map((item) => mapFind(item, event.target.value));
    foundArray = foundArray.filter((element) => {
      return element.text !== 'not found';
    });
    if (foundArray.length > 0) {
      setFilteredItems(foundArray);
    }
  };

  const mapFind = (item: menuItemType, text: string) => {
    return item.text.toLowerCase().includes(text) ? item : { text: 'not found' };
  };

  useEffect(() => {
    setFilteredItems(currentItems);
  }, [currentItems]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{ position: 'relative' }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        <Button className="button" onClick={handleClick} {...buttonProps}>
          {icon}
          {label}
          <ChevronRight
            sx={{ transform: open ? 'rotate(270deg)' : 'rotate(90deg)', position: 'absolute', right: '10px' }}
          />
        </Button>
        <Popper open={open} anchorEl={anchorEl} id="long-menu" sx={{ zIndex: 999999, width: '40ch' }} {...popperProps}>
          <Paper className="paper" {...paperProps}>
            <Typography variant="h6" textAlign="center" {...titleProps}>
              {currentTitle}
            </Typography>
            {back ? (
              <Button
                sx={{
                  padding: 4,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                onClick={handleBack}
                {...backButtonProps}
              >
                {backButton}
              </Button>
            ) : null}
            {searchable ? (
              <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                <Search fullWidth onChange={handleSearchChange} placeholderText={placeholderText} />
              </Box>
            ) : null}
            {filteredItems.length > 0 ? (
              <List
                style={{
                  maxHeight: itemHeight * maxItems,
                  overflow: 'auto',
                }}
              >
                {filteredItems &&
                  filteredItems.map((item, key) => (
                    <ListItem
                      sx={{ height: itemHeight, width: '100%' }}
                      key={item.text}
                      selected={
                        (currentFilters && currentFilters.includes(item)) ||
                        (selectVariant === 'single' && item === selectedItem)
                      }
                      onClick={(event) => handleSelectedInit(event, item)}
                      {...listItemProps}
                    >
                      {currentFilters && setCurrentFilters && currentFilters.includes(item) ? (
                        <Box display="flex" flexDirection="row" alignItems="center">
                          {item.icon && <Box paddingRight={1}>{item.icon}</Box>}
                          {item.text}
                          <Button
                            sx={{
                              padding: 0,
                              position: 'absolute',
                              right: 0,
                            }}
                            onClick={(event) => handleDelete(event, item)}
                          >
                            <Cancel />
                          </Button>
                        </Box>
                      ) : (
                        <Box display="flex" flexDirection="row" alignItems="center">
                          {item.icon && <Box paddingRight={1}>{item.icon}</Box>}
                          {item.text}
                          {item.children && <ChevronRight sx={{ position: 'absolute', right: 10 }} />}
                        </Box>
                      )}
                    </ListItem>
                  ))}
              </List>
            ) : null}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
