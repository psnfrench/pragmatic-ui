import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { SideBar } from '../components/SideBar';
import { ReactComponent as DMExpanded } from '../images/DMExpanded.svg';
import { ReactComponent as DMCollapsed } from '../images/DMCollapsed.svg';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SidebarDemo = () => {
  const navigate = useNavigate();
  // ensure that the key matches the pathname so that it can select. Does not need to include '/'
  const navItems = useMemo(
    () => [
      {
        text: 'Home',
        key: '/',
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
    [],
  );

  return (
    <SideBar
      logoCollapsed={<DMCollapsed />}
      logoExpanded={<DMExpanded />}
      items={navItems}
      childrenCollapsed={<CollapseText />}
      textVariant="body2"
      textSX={[{ color: 'black' }]}
      expandHint
      listItemSx={{ backgroundColor: 'red' }}
    >
      <Box p={2}>
        <Typography variant="h6" whiteSpace={'normal'}>
          My Profile Info
        </Typography>
      </Box>
    </SideBar>
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
