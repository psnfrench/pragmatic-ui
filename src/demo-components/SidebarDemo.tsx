import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ReactComponent as DMExpanded } from '../images/DMExpanded.svg';
import { ReactComponent as DMCollapsed } from '../images/DMCollapsed.svg';
import { Box, Button, createTheme, ThemeProvider, Typography, useTheme } from '@mui/material';
import { SideBarMobile } from '../components/SideBarMobile';
import useWindowDimensions from '../components/WindowSize';

const myTheme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'lavender',
          },
        },
      },
    },
  },
});

export type SidebarDemoProps = {
  children: JSX.Element;
};

const SidebarDemo = ({ children }: SidebarDemoProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [smallWindow, setSmallWindow] = useState<boolean>();
  const [open, setOpen] = useState(true);

  // ensure that the key matches the pathname so that it can select. Does not need to include '/'
  const navItems = useMemo(
    () => [
      {
        text: 'Home',
        key: '',
        icon: <HomeIcon />,
        onClick: () => navigate('/'),
        divider: true,
      },
      {
        text: 'Border Radius',
        key: 'border-radius',
        icon: <BorderStyleIcon />,
        onClick: () => navigate('/border-radius'),
      },
      {
        text: 'Various Demo Inputs',
        key: 'demos',
        icon: <InputIcon />,
        onClick: () => navigate('/demos'),
      },
      {
        text: 'Sign Up Form',
        key: 'signup',
        icon: <PersonAddAltIcon />,
        onClick: () => navigate('/signup'),
      },
      {
        text: 'Login Form',
        key: 'login',
        icon: <LoginIcon />,
        onClick: () => navigate('/login'),
      },
      {
        text: 'Snackbar',
        key: 'snackbar',
        icon: <EggAltIcon />,
        onClick: () => navigate('/snackbar'),
      },
      {
        text: 'Confirmation',
        key: 'confirmation',
        icon: <CheckCircleIcon />,
        onClick: () => navigate('/confirmation'),
      },
    ],
    [navigate],
  );

  const handleOpenChanged = (open: boolean) => {
    console.log('handleOpenChanged: ', open);
  };

  useEffect(() => {
    if (width < 900) setSmallWindow(true);
    else if (width >= 900) setSmallWindow(false);
  }, [smallWindow, width]);

  return (
    <Box
      sx={{
        justifyContent: 'flex-start',
        display: 'inline-flex',
        flexDirection: smallWindow ? 'column' : 'row',
        alignContent: 'flex-start',
        width: smallWindow ? '100%' : '80%',
      }}
    >
      <Box flexGrow={1}>
        <ThemeProvider
          theme={(outerTheme) => ({
            ...outerTheme, // merge in the outer theme
            ...myTheme, // override spefiic parts of the Sidebar
          })}
        >
          <SideBarMobile
            // toggle and close are used to enable altering the open state of the sidebar.
            // Currently close is a requirement for toggle to function
            // Can be used when collapsible is set to false
            toggle={open}
            close={!open}
            logoCollapsed={<DMCollapsed />}
            logoExpanded={<DMExpanded />}
            items={navItems}
            childrenCollapsed={<CollapseText />}
            textVariant="body2"
            expandHint
            selectedMenuKey={location.pathname.substring(1)}
            // Provides a way to send when the update state changes
            onOpenChanged={handleOpenChanged}
            expandOnHover={true}
            expandOnHoverCancelOnClick={true}
            paperProps={{ sx: { backgroundColor: 'red', borderRadius: '0px 12px 12px 0px !important' } }}
            // Used to easily change the sidebar background color
            menuBackgroundColor="Blue"
            // Changes the color of the text in the sidebar
            menuTextColor="white"
            // Allows changing the potision of the list item (Changing the width caused issues with this)
            listItemSx={{}}
            // Styling for the hamburger icon in the sidebar
            hamburgerIconSx={{ color: 'white' }}
            // If present, shows logo on app bar on small screens. Menu icon shows if not
            mobileLogo={<DMCollapsed />}
            // Data will appear in Appbar on small screens
            topNavChildren={
              <Box display="flex" flex={1} flexDirection="row-reverse">
                <Button size="large" variant="contained" sx={{ margin: theme.spacing(2) }}>
                  Hi
                </Button>
                <Button size="large" variant="contained" sx={{ margin: theme.spacing(2) }}>
                  Hi
                </Button>
              </Box>
            }
            // Allows for content to be placed above the appbar that is fixed to the top
            headerContent={<Box />}
          >
            <Box p={2}>
              <Typography variant="h6" whiteSpace={'normal'}>
                My Profile Info
              </Typography>
            </Box>
          </SideBarMobile>
        </ThemeProvider>
      </Box>
      {children}
    </Box>
  );
};

const CollapseText = () => {
  return (
    <Box p={2}>
      <Typography variant="h6">CT</Typography>
    </Box>
  );
};

export default SidebarDemo;
