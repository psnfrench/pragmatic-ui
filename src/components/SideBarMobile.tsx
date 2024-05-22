import Box from '@mui/material/Box';
import Typography, { TypographyTypeMap } from '@mui/material/Typography';
import { CSSObject, styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { PaperProps } from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PIcon from '../images/PIcon';
import { Colors } from '../constants/Colors';
import debounce from 'lodash/debounce';
import useWindowDimensions from './WindowSize';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export type SideBarMobileItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
};
export type SideBarMobileProps = {
  items: SideBarMobileItem[];
  selectedMenuKey?: string;
  state?: boolean;
  logoCollapsed?: React.ReactNode;
  logoExpanded: React.ReactNode;
  expandOnHover?: boolean;
  expandOnHoverDelayOpen?: number;
  expandOnHoverDelayClose?: number;
  expandOnHoverCancelOnClick?: boolean;
  collapsible?: boolean;
  expandHint?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
  textVariant?: TypographyTypeMap['props']['variant'];
  textSX?: SxProps<Theme>;
  listIconSx?: SxProps<Theme>;
  listItemSx?: SxProps<Theme>;
  paperProps?: PaperProps;
  hamburgerIconSx?: SxProps<Theme>;
  onOpenChanged?: (open: boolean) => void;
  menuBackgroundColor?: string;
  menuTextColor?: string;
  mobileLogo?: React.ReactNode;
  topNavChildren?: React.ReactNode;
  headerContent?: React.ReactNode;
  close?: boolean;
};
const openedMixin = (theme: Theme): CSSObject => ({
  '@media only screen and (max-width: 899px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 900px)': {
    width: theme.spacing(42.5),
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
  width: theme.spacing(12.5),
  // '@media only screen and (max-width: 599px)': {
  //   width: theme.spacing(12.5),
  // },
  // [theme.breakpoints.up('md')]: {
  //   width: theme.spacing(12.5),
  // },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: '100%',
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

export const SideBarMobile = ({
  items,
  state,
  selectedMenuKey,
  logoCollapsed,
  logoExpanded,
  expandOnHover,
  expandOnHoverDelayOpen = 500,
  expandOnHoverDelayClose = 500,
  expandOnHoverCancelOnClick = false,
  children,
  childrenCollapsed,
  textVariant = 'subtitle2',
  collapsible = true,
  expandHint = false,
  textSX,
  listIconSx,
  listItemSx,
  defaultOpen = true,
  paperProps,
  hamburgerIconSx = { color: Colors.greyscale.light },
  menuBackgroundColor = 'background.paper',
  menuTextColor = 'primary',
  topNavChildren,
  headerContent,
  mobileLogo,
  onOpenChanged,
  close,
}: SideBarMobileProps) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(width < 900 ? false : defaultOpen);
  const isHovering = useRef(false);
  const hasCanceledExpand = useRef(false);
  const [openedByHover, setOpenedByHover] = useState(false);
  const theme = useTheme();

  // Allows sidebar to be closed externally
  useEffect(() => {
    if (close) setOpen(false);
  }, [close]);

  useEffect(() => {
    let active = true;
    if (active) {
      setSelectedKey(selectedMenuKey);
    }
    return () => {
      active = false;
    };
  }, [selectedMenuKey]);

  useEffect(() => {
    if (onOpenChanged) {
      onOpenChanged(open);
    }
  }, [onOpenChanged, open]);

  const [selectedKey, setSelectedKey] = useState<string>();
  const [closed, setClosed] = useState(!defaultOpen);
  const toggleOpen = useCallback(() => {
    if (collapsible) {
      setOpenedByHover(false);
      setOpen((prev) => !prev);
      if (!closed) {
        setTimeout(() => {
          setClosed((prev) => !prev);
        }, 200);
      } else {
        setClosed((prev) => !prev);
      }
    }
  }, [closed, collapsible]);

  const handleItemClick = useCallback(
    (item: SideBarMobileItem) => {
      if (expandOnHoverCancelOnClick) {
        hasCanceledExpand.current = true;
      }
      setSelectedKey(item.key);
      if (item.onClick) {
        item.onClick();
        if (width < 900) setOpen(false);
      }
    },
    [expandOnHoverCancelOnClick, width],
  );

  // use debounced open/close functions so that multiple mouseenter/leave events do not trigger lots of actions
  const delayedOpen = useMemo(
    () =>
      debounce(() => {
        // make sure we are still hovering and has not been canceled
        if (isHovering.current === true && hasCanceledExpand.current === false) {
          setOpen(true);
          setOpenedByHover(true);
        }
      }, expandOnHoverDelayOpen),
    [expandOnHoverDelayOpen],
  );

  const delayedClose = useMemo(
    () =>
      debounce(() => {
        // only close if no longer hoverring on any button
        // I.e. the mouse leave event may frie from on button, then a mouse enter event may fire from a second button
        if (isHovering.current === false && openedByHover) {
          toggleOpen();
        }
      }, expandOnHoverDelayClose),
    [openedByHover, toggleOpen, expandOnHoverDelayClose],
  );

  const handleMouseEnter = useCallback(() => {
    if (!expandOnHover) return;
    hasCanceledExpand.current = false;
    isHovering.current = true;
    if (open) return;
    delayedOpen();
  }, [delayedOpen, expandOnHover, isHovering, open]);
  const handleMouseLeave = useCallback(() => {
    if (!expandOnHover) return;
    isHovering.current = false;
    if (open && openedByHover) {
      delayedClose();
    }
  }, [delayedClose, expandOnHover, open, openedByHover]);

  useEffect(() => {
    if (state !== undefined) {
      setOpen(state);
    }
  }, [state, collapsible]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: open ? 'none' : 'block', md: 'none', position: 'fixed', zIndex: 100 },
        }}
      >
        <AppBar sx={{ backgroundColor: 'background.paper', borderRadius: 0 }}>
          {headerContent}
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleOpen()}
            >
              {mobileLogo ? (
                mobileLogo
              ) : (
                <>
                  <PIcon name="menu" size={24} sx={{ display: 'inline-block', color: theme.palette.primary.dark }} />
                </>
              )}
            </IconButton>
            {topNavChildren}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ ...paperProps, sx: { ...paperProps?.sx, backgroundColor: `${menuBackgroundColor} !important` } }}
        sx={{
          display: { xs: open ? 'block' : 'none', md: 'block' },
        }}
      >
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
            {open ? (
              <Box display="flex" flex={1} flexDirection="column">
                <Box sx={{ textAlign: 'right', ...hamburgerIconSx }}>
                  {collapsible && (
                    <>
                      <PIcon
                        name="chevronLeft"
                        size={24}
                        sx={{ marginRight: theme.spacing(-1), display: 'inline-block' }}
                      />
                      <PIcon name="menu" size={24} sx={{ display: 'inline-block' }} />
                    </>
                  )}
                </Box>
                {logoExpanded}
              </Box>
            ) : (
              <Tooltip title={expandHint ? <PIcon name="chevronRight" size={24} /> : ''} arrow placement="top">
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignContent="space-between"
                  sx={{ height: '124px' }}
                >
                  {collapsible && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      height="100%"
                      marginLeft={theme.spacing(0.8)}
                      sx={{ ...hamburgerIconSx }}
                    >
                      <PIcon name="menu" size={24} sx={{ display: 'inline-block', marginRight: theme.spacing(-0.5) }} />
                      <PIcon
                        name="chevronRight"
                        size={24}
                        sx={{ marginLeft: theme.spacing(-0.5), display: 'inline-block' }}
                      />
                    </Box>
                  )}
                  <Box display="flex" justifyContent="center">
                    {logoCollapsed}
                  </Box>
                </Box>
              </Tooltip>
            )}
          </ListItemButton>
          {items.map((item) => (
            <React.Fragment key={item.key}>
              <ListItem disablePadding>
                <ListItemButton
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  selected={selectedKey === item.key}
                  onClick={() => handleItemClick(item)}
                  sx={{
                    px: 2.5,
                    borderRadius: 0.5,
                    ...listItemSx,
                  }}
                >
                  <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', color: menuTextColor, ...listIconSx }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant={textVariant}
                        color={menuTextColor}
                        sx={{ textAlign: 'left', color: menuTextColor, ...textSX }}
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
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          {open ? children : childrenCollapsed}
        </Box>
      </Drawer>
    </>
  );
};
