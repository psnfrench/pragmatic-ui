import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import './App.css';
import { theme as defaultTheme } from './constants/theme';
import { SnackBarProvider } from './context/snackbar';
import { ConfirmationServiceProvider } from './context/confirmation';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
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
                  width: '80%',
                }}
              >
                <Box flexGrow={1}>
                  <SidebarDemo />
                </Box>
                <Box sx={{ padding: 3, width: '100%' }}>
                  <Typography variant="h3">Pragmatic UI Demo</Typography>
                  <br />
                  <Box>
                    <AppRouter setTheme={setTheme} />
                  </Box>
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
