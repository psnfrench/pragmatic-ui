import MuiDrawer from '@mui/material/Drawer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Colors } from '../constants/Colors';
import debounce from 'lodash/debounce';
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
import PIcon from '../images/PIcon';

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
  expandOnHoverCancelOnClick?: boolean;
  collapsible?: boolean;
  showHamburgerIcon?: boolean;
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
const openedMixin = (theme: Theme): CSSObject => ({
  '@media only screen and (max-width: 600px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 601px)': {
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
  '@media only screen and (max-width: 600px)': {
    width: theme.spacing(12.5),
  },
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(12.5),
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: '100%',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiButtonBase-root': {
    justifyContent: 'center',
  },
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
  expandOnHoverCancelOnClick = false,
  children,
  childrenCollapsed,
  textVariant = 'subtitle2',
  collapsible = true,
  showHamburgerIcon = true,
  expandHint = false,
  textSX,
  expandedWidth,
  defaultOpen = true,
  paperProps,
  hamburgerIconSx = { color: Colors.greyscale.light },
  onOpenChanged,
}: SideBarProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const isHovering = useRef(false);
  const hasCanceledExpand = useRef(false);
  const [openedByHover, setOpenedByHover] = useState(false);
  const theme = useTheme();

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
    (item: SideBarItem) => {
      if (expandOnHoverCancelOnClick) {
        hasCanceledExpand.current = true;
      }
      setSelectedKey(item.key);
      if (item.onClick) {
        item.onClick();
      }
    },
    [expandOnHoverCancelOnClick],
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

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          '&.MuiPaper-root.MuiDrawer-paper': { width: open && expandedWidth ? expandedWidth : undefined },
          ...paperProps?.sx,
        },
        ...paperProps,
      }}
      sx={{ '&.MuiDrawer-docked': { width: open && expandedWidth ? expandedWidth : undefined } }}
    >
      <List>
        {collapsible && (
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
                {showHamburgerIcon && (
                  <Box sx={{ textAlign: 'right', ...hamburgerIconSx }} data-testid="HamburgerIcon">
                    <PIcon
                      name="chevronLeft"
                      size={24}
                      sx={{ marginRight: theme.spacing(-1), display: 'inline-block' }}
                    />
                    <PIcon name="menu" size={24} sx={{ display: 'inline-block' }} />
                  </Box>
                )}
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
                  {showHamburgerIcon && (
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
        )}
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
                }}
              >
                <Tooltip title={item.text} arrow placement="right">
                  <ListItemIcon sx={{ ...textSX, display: 'flex', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                </Tooltip>
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
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
        {open ? children : childrenCollapsed}
      </Box>
    </Drawer>
  );
};
