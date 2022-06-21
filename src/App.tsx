import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, TextField, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import './App.css';
import { theme as defaultTheme, createPragmaticTheme } from './constants/theme';
import TextDemo from './demo-components/TextDemo';
import RadioDemo from './demo-components/RadioDemo';
import SignUpDemo from './demo-components/SignUpDemo';
import { SnackBarProvider } from './context/snackbar';
import SnackBarDemo from './demo-components/SnackBarDemo';
import { ConfirmationServiceProvider } from './context/confirmation';
import ConfirmationDemo from './demo-components/ConfirmationDemo';
import DateDemo from './demo-components/DateDemo';
import { SideBar } from './components/SideBar';
import { ReactComponent as DMExpanded } from './images/DMExpanded.svg';
import { ReactComponent as DMCollapsed } from './images/DMCollapsed.svg';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: 'Sally',
  description: 'Works in accounts\nHas the nice office',
  gender: 'female',
  date1: new Date(),
  date2: new Date(),
};


const navItems = [
  { text: 'Text Inputs', key: 'textInput', icon: <InputIcon />, divider: true },
  {
    text: 'Sign Up Form',
    key: 'signup',
    icon: <LoginIcon />,
    onClick: (key: string) => (  ),
  },
];

function App() {
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    console.log('values: ', values);
  };
  const [theme, setTheme] = useState(defaultTheme);
  const [borderRadius, setBorderRadius] = useState(16);
  const [open, setOpen] = useState(true);

  const handleBorderRadiusChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius(parseInt(value));
  };

  useEffect(() => {
    setTheme(createPragmaticTheme({ borderRadius }));
  }, [borderRadius]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackBarProvider>
          <ConfirmationServiceProvider>
            <Box
              sx={{
                justifyContent: 'flex-start',
                display: 'inline-flex',
                flexDirection: 'row',
                alignContent: 'flex-start',
              }}
            >
              <Box flexGrow={1}>
                <SideBar
                  logoCollapsed={<DMCollapsed />}
                  logoExpanded={<DMExpanded />}
                  items={navItems}
                  open={open}
                  setOpen={setOpen}
                >
                  <Box p={2}>
                    <Typography variant="h6" whiteSpace={'normal'}>
                      My Profile Info
                    </Typography>
                  </Box>
                </SideBar>
              </Box>
              <Box sx={{ padding: 3, positionleft: open ? '3px' : '400px' }}>
                <Typography variant="h3">Pragmatic UI Demo</Typography>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <TextField
                          label="Border Radius"
                          onChange={handleBorderRadiusChange}
                          value={borderRadius}
                          type="number"
                        />
                      }
                    />
                    <Route
                      path="/demos"
                      element={
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                          {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                              <TextDemo />
                              <DateDemo />
                              <RadioDemo />
                              <button type="submit">Submit</button>
                            </form>
                          )}
                        </Formik>
                      }
                    />
                    <Route path="/signup" element={<SignUpDemo />} />

                    <Route path="/snackbar" element={<SnackBarDemo />} />

                    <Route path="/confirmation" element={<ConfirmationDemo />} />
                  </Routes>
                </BrowserRouter>
              </Box>
            </Box>
          </ConfirmationServiceProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
