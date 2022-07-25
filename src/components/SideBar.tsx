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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  expandHint?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
  textVariant?: TypographyTypeMap['props']['variant'];
  textSX?: SxProps<Theme>;
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
  expandHint = false,
  textSX,
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
  const [closed, setClosed] = useState(!defaultOpenState);
  const toggleOpen = () => {
    if (collapsible) {
      setOpen((prev) => !prev);
      if (!closed) {
        setTimeout(() => {
          setClosed((prev) => !prev);
        }, 200);
      } else {
        setClosed((prev) => !prev);
      }
    }
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
            borderRadius: 1,
            transition: '1s',
          }}
        >
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 'none' }}>
            {open ? (
              <Box display="flex" flex={1} flexDirection="column">
                <Box color={Colors.greyscale.light} sx={{ textAlign: 'right' }}>
                  {collapsible && (
                    <>
                      <ChevronLeftIcon sx={{ marginRight: '-9px' }} />
                      <MenuIcon />
                    </>
                  )}
                </Box>
                {logoExpanded}
              </Box>
            ) : (
              <Tooltip title={<ChevronRight />} arrow placement="top">
                <Box display="flex" flexDirection="column" justifyContent="center">
                  {expandHint ? (
                    <Box
                      display="flex"
                      flex={1}
                      position="absolute"
                      top="0px"
                      left="20px"
                      right="auto"
                      justifyContent="center"
                      color={Colors.greyscale.light}
                    >
                      <MenuIcon sx={{ marginRight: '-4.5px' }} />
                      <ChevronRightIcon sx={{ marginLeft: '-4.5px' }} />
                    </Box>
                  ) : null}
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
                  justifyContent: !closed ? 'initial' : 'center',
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
                  sx={{ display: open ? 'block' : 'none', margin: 0, ml: 3 }}
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
