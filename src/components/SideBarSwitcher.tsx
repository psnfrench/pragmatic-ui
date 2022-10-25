import { Box } from '@mui/material';
import React from 'react';
import { Colors } from '../constants/Colors';
import { SideBarProps, SideBar } from './SideBar';
import { SideBarMobile } from './SideBarMobile';

const SideBarSwitcher = ({
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
  expandHint = false,
  textSX,
  defaultOpen = true,
  paperProps,
  hamburgerIconSx = { color: Colors.greyscale.light },
  onOpenChanged,
  closedWidth,
  expandedWidth,
}: SideBarProps) => {
  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <SideBar
          collapsible={collapsible}
          defaultOpen={defaultOpen}
          expandOnHoverDelayOpen={expandOnHoverDelayOpen}
          expandOnHoverDelayClose={expandOnHoverDelayClose}
          closedWidth={closedWidth}
          expandedWidth={expandedWidth}
          logoCollapsed={logoCollapsed}
          logoExpanded={logoExpanded}
          items={items}
          childrenCollapsed={childrenCollapsed}
          textVariant={textVariant}
          textSX={textSX}
          expandHint={expandHint}
          paperProps={paperProps}
          hamburgerIconSx={hamburgerIconSx}
          selectedMenuKey={selectedMenuKey}
          onOpenChanged={onOpenChanged}
          expandOnHover={expandOnHover}
          expandOnHoverCancelOnClick={expandOnHoverCancelOnClick}
        >
          {children}
        </SideBar>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <SideBarMobile
          collapsible={collapsible}
          defaultOpen={defaultOpen}
          expandOnHoverDelayOpen={expandOnHoverDelayOpen}
          expandOnHoverDelayClose={expandOnHoverDelayClose}
          closedWidth={closedWidth}
          expandedWidth={expandedWidth}
          logoCollapsed={logoCollapsed}
          logoExpanded={logoExpanded}
          items={items}
          childrenCollapsed={childrenCollapsed}
          textVariant={textVariant}
          textSX={textSX}
          expandHint={expandHint}
          paperProps={paperProps}
          hamburgerIconSx={hamburgerIconSx}
          selectedMenuKey={selectedMenuKey}
          onOpenChanged={onOpenChanged}
          expandOnHover={expandOnHover}
          expandOnHoverCancelOnClick={expandOnHoverCancelOnClick}
        >
          {children}
        </SideBarMobile>
      </Box>
    </>
  );
};

export default SideBarSwitcher;
