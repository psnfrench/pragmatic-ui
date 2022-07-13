import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, styled, TextFieldProps } from '@mui/material';
import { Search } from '../Search';
import ComplexFilterChildren from './ComplexFilterChildrenOriginal';

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
  children?: childrenType[];
};

export type childrenType = {
  text: string;
  icon?: React.ReactNode;
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
  icon?: JSX.Element;
  label?: string;
  itemHeight?: number;
  handleSelected: (event: React.MouseEvent<HTMLLIElement>, item: string) => void;
  handleSearchChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleSearchSubmit?: React.FormEventHandler<HTMLDivElement> | undefined;
};

export function PComplexFilter({
  items = options,
  selectedItem,
  anchorEl,
  setAnchorEl,
  icon = <MoreVertIcon />,
  label = 'Options',
  itemHeight = ITEM_HEIGHT,
  handleSelected,
  handleSearchChange,
  handleSearchSubmit,
}: PComplexFilterProps) {
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: itemHeight * 4.5,
            width: '40ch',
          },
        }}
      >
        {handleSearchChange ? (
          <Search onChange={handleSearchChange} onSubmit={handleSearchSubmit} />
        ) : items && items.length > 0 ? (
          items.map((item, key) =>
            item.children ? (
              <ComplexFilterChildren
                item={item}
                ITEM_HEIGHT={itemHeight}
                handleSelected={handleSelected}
                selectedItem={selectedItem}
                setAnchorEl={setAnchorEl}
              />
            ) : (
              <MenuItem
                sx={{ width: '100%' }}
                key={item.text}
                selected={item.text === selectedItem}
                onClick={(event) => handleSelected(event, item.text)}
              >
                {item.icon}
                {item.text}
              </MenuItem>
            ),
          )
        ) : null}
      </Menu>
    </div>
  );
}
