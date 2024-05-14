import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import React, { useContext, useState } from 'react';
import './App.css';
import { theme as defaultTheme } from './constants/theme';
import { SnackBarProvider } from './context/snackbar';
import { ConfirmationServiceProvider } from './context/confirmation';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
// import SidebarMobileDemo from './demo-components/SidebarMobileDemo';
import useWindowDimensions from './components/WindowSize';
import SidebarDemo from './demo-components/SidebarDemo';
import SidebarMobileDemo from './demo-components/SidebarMobileDemo';

const SideBarContext = React.createContext<{
  mobileSidebar: boolean;
  setMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mobileSidebar: false,
  setMobileSidebar: () => undefined,
});

function App() {
  const [theme] = useState(defaultTheme);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackBarProvider>
          <ConfirmationServiceProvider>
            <BrowserRouter>
              <SideBarContext.Provider value={{ mobileSidebar, setMobileSidebar }}>
                {mobileSidebar ? (
                  <SidebarMobileDemo>
                    <AppContents />
                  </SidebarMobileDemo>
                ) : (
                  <SidebarDemo>
                    <AppContents />
                  </SidebarDemo>
                )}
              </SideBarContext.Provider>
            </BrowserRouter>
          </ConfirmationServiceProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

const AppContents = () => {
  const { mobileSidebar, setMobileSidebar } = useContext(SideBarContext);
  const [, setTheme] = useState(defaultTheme);
  const { width } = useWindowDimensions();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setMobileSidebar(checked);
  };
  return (
    <Box sx={{ padding: 3, width: '100%', paddingTop: width < 900 ? '70px' : 3 }}>
      <Typography variant="h3">Pragmatic UI Demo</Typography>
      <FormControlLabel
        control={<Switch checked={mobileSidebar} onChange={handleSwitchChange} />}
        label="Mobile Sidebar"
      />
      <br />
      <Box>
        <AppRouter setTheme={setTheme} />
      </Box>
    </Box>
  );
};

export default App;
