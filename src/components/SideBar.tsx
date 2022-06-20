import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, List } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export type SideBarItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
};
export type SideBarProps = {
  items: SideBarItem[];
  logoCollapsed: React.ReactNode;
  logoExpanded: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
};

export const SideBar = ({ items, defaultOpen = true, logoCollapsed, logoExpanded, children }: SideBarProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedKey, setSelectedKey] = useState<string>();

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
            px: 2.5,
            borderRadius: '5px',
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
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            {item.divider && <Divider />}
          </ListItem>
        ))}
      </List>
      <Box flex={1} alignItems="flex-end" display="flex">
        {children}
      </Box>
    </Drawer>
  );
};
