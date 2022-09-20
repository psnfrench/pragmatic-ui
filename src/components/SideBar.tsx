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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Colors } from '../constants/Colors';
import { ChevronRight } from '@mui/icons-material';
import debounce from 'lodash/debounce';

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
  expandOnHover?: boolean;
  expandOnHoverDelayOpen?: number;
  expandOnHoverDelayClose?: number;
  collapsible?: boolean;
  expandHint?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  childrenCollapsed?: React.ReactNode;
  textVariant?: TypographyTypeMap['props']['variant'];
  textSX?: SxProps<Theme>;
  expandedWidth?: number;
  paperProps?: PaperProps;
  hamburgerIconSx?: SxProps<Theme>;
  onOpenChanged?: (open: boolean) => void;
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
  width: 'calc(90px)',
  [theme.breakpoints.up('sm')]: {
    width: '100px',
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
  selectedMenuKey,
  logoCollapsed,
  logoExpanded,
  expandOnHover,
  expandOnHoverDelayOpen = 500,
  expandOnHoverDelayClose = 500,
  children,
  childrenCollapsed,
  textVariant = 'subtitle2',
  collapsible = true,
  expandHint = false,
  textSX,
  defaultOpen = true,
  expandedWidth,
  paperProps,
  hamburgerIconSx = { color: Colors.greyscale.light },
  onOpenChanged,
}: SideBarProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const isHovering = useRef(false);
  const [openedByHover, setOpenedByHover] = useState(false);
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
    if (expandedWidth) drawerWidth = expandedWidth;
  }, [expandedWidth]);

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

  const handleItemClick = useCallback((item: SideBarItem) => {
    setSelectedKey(item.key);
    if (item.onClick) {
      item.onClick();
    }
  }, []);

  // use debounced open/close functions so that multiple mouseenter/leave events do not trigger lots of actions
  const delayedOpen = useMemo(
    () =>
      debounce(() => {
        // make sure we are still hovering
        if (isHovering.current === true) {
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
        {items.map((item) => (
          <React.Fragment key={item.key}>
            <ListItem disablePadding>
              <ListItemButton
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
