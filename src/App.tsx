import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { theme as defaultTheme, createPragmaticTheme } from './constants/theme';
import { SnackBarProvider } from './context/snackbar';
import { ConfirmationServiceProvider } from './context/confirmation';
import { BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import AppRouter from './AppRouter';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';
import SidebarDemo from './demo-components/SidebarDemo';


function App() {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackBarProvider>
          <ConfirmationServiceProvider>
            <BrowserRouter>
              <Box
                sx={{
                  justifyContent: 'flex-start',
                  display: 'inline-flex',
                  flexDirection: 'row',
                  alignContent: 'flex-start',
                }}
              >
                <Box flexGrow={1}>
                  <SidebarDemo />
                </Box>
                <Box sx={{ padding: 3, positionleft: open ? '3px' : '400px' }}>
                  <Typography variant="h3">Pragmatic UI Demo</Typography>
                  <br />
                  <AppRouter setTheme={setTheme}/>
                </Box>
              </Box>
            </BrowserRouter>
          </ConfirmationServiceProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
