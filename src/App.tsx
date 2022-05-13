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
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
