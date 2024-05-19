import React, { useMemo } from 'react';
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SideBar } from '../components/SideBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  return (
    <Box
      sx={{
        justifyContent: 'flex-start',
        display: 'inline-flex',
        alignContent: 'flex-start',
      }}
    >
      <Box flexGrow={1}>
        <ThemeProvider
          theme={(outerTheme) => ({
            ...outerTheme, // merge in the outer theme
            ...myTheme, // override spefiic parts of the Sidebar
          })}
        >
          <SideBar
            collapsible={true}
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
            defaultOpen={false}
            expandedWidth={280}
          >
            <Box p={2}>
              <Typography variant="h6" whiteSpace={'normal'}>
                My Profile Info
              </Typography>
            </Box>
          </SideBar>
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
