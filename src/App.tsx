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

const initialValues = {
  firstName: 'Sally',
  description: 'Works in accounts\nHas the nice office',
  gender: 'female',
  date1: new Date(),
  date2: new Date(),
};
function App() {
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    console.log('values: ', values);
  };
  const [theme, setTheme] = useState(defaultTheme);
  const [borderRadius, setBorderRadius] = useState(16);

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
            <Box display="flex" flexDirection="row">
              <SideBar
                logoCollapsed={<DMCollapsed />}
                logoExpanded={<DMExpanded />}
                items={[
                  { text: 'Text Inputs', key: 'textInput', icon: <InputIcon />, divider: true },
                  {
                    text: 'Sign Up Form',
                    key: 'signUp',
                    icon: <LoginIcon />,
                    onClick: () => console.log('sign up clicked'),
                  },
                ]}
              >
                <Box p={2}>
                  <Typography variant="h6">My Profile Info</Typography>
                </Box>
              </SideBar>
              <Box p={3} flex={1}>
                <Typography variant="h3">Pragmatic UI Demo</Typography>
                <TextField
                  label="Border Radius"
                  onChange={handleBorderRadiusChange}
                  value={borderRadius}
                  type="number"
                />

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

                <SignUpDemo />

                <SnackBarDemo />

                <ConfirmationDemo />
              </Box>
            </Box>
          </ConfirmationServiceProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
