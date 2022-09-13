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
  PaperProps,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Colors } from '../constants/Colors';
import { ChevronRight } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

export type SideBarItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
};
export type SideBarProps = {
  items: SideBarItem[];
  logoCollapsed?: React.ReactNode;
  logoExpanded: React.ReactNode;
  collapsible?: boolean;
  expandHint?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
  textVariant?: TypographyTypeMap['props']['variant'];
  textSX?: SxProps<Theme>;
  listItemSx?: SxProps<Theme>;
  expandedWidth?: number;
  paperProps?: PaperProps;
  hamburgerIconSx?: SxProps<Theme>;
};

let drawerWidth = 340;

const openedMixin = (theme: Theme): CSSObject => ({
  '@media only screen and (max-width: 960px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 961px)': {
    width: drawerWidth,
  },
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
  '@media only screen and (max-width: 960px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 961px)': {
    width: drawerWidth,
  },
  width: `calc(90px)`,
  [theme.breakpoints.up('sm')]: {
    width: `100px`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '@media only screen and (max-width: 960px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 961px)': {
    width: drawerWidth,
  },
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

export const SideBar = ({
  items,
  logoCollapsed,
  logoExpanded,
  children,
  childrenCollapsed,
  textVariant = 'subtitle2',
  collapsible = true,
  expandHint = false,
  textSX,
  listItemSx,
  defaultOpen = true,
  expandedWidth,
  paperProps,
  hamburgerIconSx = { color: Colors.greyscale.light },
}: SideBarProps) => {
  const getSelectedMenu = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const selectedItem = items.find((n) => n.key === path[1]);
    if (selectedItem) return selectedItem.key;
    else return undefined;
  };
  const selectedMenuKey: string | undefined = getSelectedMenu();

  useEffect(() => {
    let active = true;
    if (active) {
      setSelectedKey(selectedMenuKey);
    }
    return () => {
      active = false;
    };
  }, [selectedMenuKey]);

  const StyledListItemButton = styled(ListItemButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
      ...listItemSx,
    },
  }));

  useEffect(() => {
    if (expandedWidth) drawerWidth = expandedWidth;
  }, [expandedWidth]);

  const [selectedKey, setSelectedKey] = useState<string>();
  const [open, setOpen] = useState(defaultOpen);
  const [closed, setClosed] = useState(!defaultOpen);
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
    <Drawer variant="permanent" open={open} PaperProps={{ ...paperProps }}>
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
                <Box sx={{ textAlign: 'right', ...hamburgerIconSx }}>
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
                <Box display="flex" justifyContent="center">
                  {expandHint ? (
                    <Box
                      display="flex"
                      flex={1}
                      position="absolute"
                      top="0px"
                      left="20px"
                      right="auto"
                      justifyContent="center"
                      sx={{ ...hamburgerIconSx }}
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
              <StyledListItemButton
                selected={selectedKey === item.key}
                onClick={() => handleItemClick(item)}
                sx={{
                  justifyContent: !closed ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 0.5,
                }}
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
              </StyledListItemButton>
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
