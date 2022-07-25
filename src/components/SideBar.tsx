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
  TypographyTypeMap,
  SxProps,
  Tooltip,
  Button,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Colors } from '../constants/Colors';
import { ChevronRight } from '@mui/icons-material';

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
  logoCollapsed?: React.ReactNode;
  logoExpanded: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
  textVariant?: TypographyTypeMap['props']['variant'];
  textSX?: SxProps<Theme>;
  closedDrawerWidth: number;
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
  width: `calc(90px)`,
  [theme.breakpoints.up('sm')]: {
    width: `100px`,
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
  textVariant = 'subtitle2',
  collapsible = true,
  textSX,
  closedDrawerWidth,
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
    collapsible ? setOpen((prev) => !prev) : setOpen((prev) => prev);
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
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 'none', flex: 1 }}>
            {open ? (
              <>
                <Box color={Colors.greyscale.light} sx={{ textAlign: 'right' }}>
                  {collapsible && (
                    <>
                      <ChevronLeftIcon />
                      <MenuIcon />
                    </>
                  )}
                </Box>
                {logoExpanded}
              </>
            ) : (
              <Tooltip title={<ChevronRight />} arrow placement="top">
                <Box display="flex" flex={1} justifyContent="center">
                  {logoCollapsed}
                </Box>
              </Tooltip>
            )}
          </Box>
        </ListItemButton>

        {items.map((item, index) => (
          <React.Fragment key={item.key}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 0.5,
                }}
                selected={selectedKey === item.key}
                onClick={() => handleItemClick(item)}
              >
                <ListItemIcon sx={textSX}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant={textVariant}
                      sx={[{ textAlign: 'left' }, ...(Array.isArray(textSX) ? textSX : [textSX])]}
                    >
                      {item.text}
                    </Typography>
                  }
                  sx={{ display: open ? 'block' : 'none', ml: 3 }}
                />
              </ListItemButton>
            </ListItem>

            {item.divider && (
              <>
                <br /> <Divider />
              </>
            )}
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>{open ? children : childrenCollapsed}</Box>
    </Drawer>
  );
};
