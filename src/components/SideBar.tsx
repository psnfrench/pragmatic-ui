import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  styled,
  Theme,
  CSSObject,
  Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Colors } from '../constants/Colors';

export type SideBarItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
};
export type SideBarProps = {
  items: SideBarItem[];
  selectedMenuKey?: string;
  logoCollapsed: React.ReactNode;
  logoExpanded: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
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
  width: `calc(${theme.spacing(7)} + 10px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 10px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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
}));

const defaultOpenState: boolean = true;

export const SideBar = ({
  items,
  logoCollapsed,
  logoExpanded,
  children,
  childrenCollapsed,
  selectedMenuKey,
}: SideBarProps) => {
  useEffect(() => {
    let active = true;
    if (active) {
      setSelectedKey(selectedMenuKey);
    }
    return () => {
      active = false;
    };
  }, [selectedMenuKey]);

  const [selectedKey, setSelectedKey] = useState<string>();
  const [open, setOpen] = useState(defaultOpenState);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (item: SideBarItem) => {
    setSelectedKey(item.key);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <List>
        <ListItemButton
          onClick={toggleOpen}
          sx={{
            minHeight: 140,
            justifyContent: open ? 'initial' : 'center',
            px: 0.5,
            borderRadius: 1,
            transition: '1s',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 'none', width: '100%' }}>
            {open ? (
              <>
                <Box color={Colors.greyscale.light} sx={{ textAlign: 'right' }}>
                  <ChevronLeftIcon />
                  <MenuIcon />
                </Box>
                {logoExpanded}
              </>
            ) : (
              <>{logoCollapsed}</>
            )}
          </Box>
        </ListItemButton>

        {items.map((item, index) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 0.5,
              }}
              selected={selectedKey === item.key}
              onClick={() => handleItemClick(item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                    {item.text}
                  </Typography>
                }
                sx={{ display: open ? 'block' : 'none', ml: 3 }}
              />
            </ListItemButton>

            {item.divider && <Divider />}
          </ListItem>
        ))}
      </List>
      <Box sx={{ flex: 1, alignItems: 'flex-end', display: 'flex' }}>{open ? children : childrenCollapsed}</Box>
    </Drawer>
  );
};
