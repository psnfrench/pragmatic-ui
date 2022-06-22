import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SideBarComponents } from '../components/SideBarComponents';
import { ReactComponent as DMExpanded } from '../images/DMExpanded.svg';
import { ReactComponent as DMCollapsed } from '../images/DMCollapsed.svg';
import { Box, Typography } from '@mui/material';



const SidebarDemo = () => {
    const navigate = useNavigate();
    const navItems = useMemo(
        () => [
            {
                text: 'Home',
                key: 'home',
                icon: <HomeIcon />,
                onClick: () => navigate('/'),
                divider: true,
            },
            {
                text: 'Border Radius',
                key: 'borderRadius',
                icon: <BorderStyleIcon />,
                onClick: () => navigate('/border-radius'),
            },
            {
                text: 'Text Inputs', key: 'textInput', icon: <InputIcon />,
                onClick: () => navigate('/demos'),
            },
            {
                text: 'Sign Up Form',
                key: 'signup',
                icon: <LoginIcon />,
                onClick: () => navigate('/signup'),
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
        <SideBarComponents
            logoCollapsed={<DMCollapsed />}
            logoExpanded={<DMExpanded />}
            items={navItems}
        >
            <Box p={2}>
                <Typography variant="h6" whiteSpace={'normal'} >
                    My Profile Info
                </Typography>
            </Box>
        </SideBarComponents>
    )
}

export default SidebarDemo
