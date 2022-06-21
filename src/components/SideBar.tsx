import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List, styled, Theme, CSSObject } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export type SideBarItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
  divider?: boolean;
  onClick?: (key: string) => Window | null
};
export type SideBarProps = {
  items: SideBarItem[];
  logoCollapsed: React.ReactNode;
  logoExpanded: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const drawerWidth = 340;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 100px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 100px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const SideBar = ({ items, logoCollapsed, logoExpanded, children, open, setOpen }: SideBarProps) => {

  const [selectedKey, setSelectedKey] = useState<string>();

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (item: SideBarItem) => {
    setSelectedKey(item.key);
    if (item.onClick) {
      item.onClick(item.key);
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <List
        sx={{
          margin: '10px',
          // selected and (selected + hover) states
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: '#87cefa',
            '&, & .MuiListItemIcon-root, & .MuiTypography-root': {
              color: 'white',
            },
          },
        }}
      >
        <ListItemButton
          onClick={toggleOpen}
          sx={{
            minHeight: 140,
            justifyContent: open ? 'initial' : 'center',
            px: 0.5,
            borderRadius: '5px',
            transition: '1s',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            {open ? (
              <>
                {logoExpanded}
                <Box
                  sx={{
                    color: 'gray',
                    position: 'relative',
                    right: 20,
                  }}
                >
                  <ChevronLeftIcon />
                  <MenuIcon />
                </Box>
              </>
            ) : (
              <>{logoCollapsed}</>
            )}
          </Box>
        </ListItemButton>

        {items.map((item, index) => (
          <ListItem
            key={item.key}
            disablePadding
            sx={{
              display: 'block',
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: '5px',
              }}
              selected={selectedKey === item.key}
              onClick={() => handleItemClick(item)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 0,
                  transition: "1s",
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ display: open ? "block" : "none" }} />
            </ListItemButton>

            {item.divider && <Divider />}
          </ListItem>
        ))}
      </List>
      <Box sx={{ flex: 1, alignItems: 'flex-end', display: "flex"}}>
        {children}
      </Box>
    </Drawer>
  );
};
