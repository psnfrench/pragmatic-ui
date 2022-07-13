import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import React from 'react';
import { itemType } from './PComplexFilterOriginal';
import { ChevronRight } from '@mui/icons-material';
import { Colors } from '../../constants/Colors';

export type ComplexFilterChildrenProps = {
  item: itemType;
  ITEM_HEIGHT: number;
  handleSelected: (event: React.MouseEvent<HTMLLIElement>, key: string) => void;
  setAnchorEl: (value: React.SetStateAction<HTMLElement | null>) => void;
  selectedItem?: string;
  chevronIcon?: React.ReactNode;
};

const StyledButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
  margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
  display: 'flex',
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'left',
  textAlign: 'right',
  color: Colors.greyscale.placehold,
}));

const ComplexFilterChildren = ({
  item,
  ITEM_HEIGHT,
  handleSelected,
  selectedItem,
  setAnchorEl,
}: ComplexFilterChildrenProps) => {
  const [childAnchorEl, setChildAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(childAnchorEl);
  const handleClick = (event: any) => {
    setChildAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setChildAnchorEl(null);
    setAnchorEl(null);
    //console.log(childAnchorEl);
  };
  console.log(selectedItem);
  return (
    <div>
      <StyledButton
        aria-label="more"
        id={item.text}
        aria-controls={open ? item.text + '-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event) => handleClick(event)}
      >
        {item.icon}
        {item.text}
        <ChevronRight sx={{ marginLeft: 'auto' }} />
        <Menu
          id={item.text + '-menu'}
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={childAnchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {item.children && item.children.length > 0
            ? item.children.map((child, key) => (
                <MenuItem
                  key={child.text}
                  selected={child.text === selectedItem}
                  onClick={(event) => handleSelected(event, child.text)}
                >
                  {child.icon}
                  {child.text}
                </MenuItem>
              ))
            : null}
        </Menu>
      </StyledButton>
    </div>
  );
};
ComplexFilterChildren.muiName = 'menuItem';
export default ComplexFilterChildren;
