import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import './App.css';
import { theme } from './constants/theme';
import TextDemo from './demo-components/TextDemo';
import RadioDemo from './demo-components/RadioDemo';
import SignUpDemo from './demo-components/SignUpDemo';
import { SnackBarProvider } from './context/snackbar';
import SnackBarDemo from './demo-components/SnackBarDemo';
import { ConfirmationServiceProvider } from './context/confirmation';
import ConfirmationDemo from './demo-components/ConfirmationDemo';

const initialValues = {
  firstName: 'Sally',
  gender: 'female',
};
function App() {
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    console.log('values: ', values);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackBarProvider>
          <ConfirmationServiceProvider>
            <Box p={3}>
              <Typography variant="h3">Pragmatic UI Demo</Typography>

              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextDemo />
                    <RadioDemo />
                    <button type="submit">Submit</button>
                  </form>
                )}
              </Formik>

              <SignUpDemo />

              <SnackBarDemo />

              <ConfirmationDemo />
            </Box>
          </ConfirmationServiceProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
