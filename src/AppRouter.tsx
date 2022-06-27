import { Theme } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import './App.css';
import TextDemo from './demo-components/TextDemo';
import RadioDemo from './demo-components/RadioDemo';
import SignUpDemo from './demo-components/SignUpDemo';
import SnackBarDemo from './demo-components/SnackBarDemo';
import ConfirmationDemo from './demo-components/ConfirmationDemo';
import BorderRadiusDemo from './demo-components/BorderRadiusDemo';
import DateDemo from './demo-components/DateDemo';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginDemo from './demo-components/LoginDemo';

const initialValues = {
  firstName: 'Sally',
  description: 'Works in accounts\nHas the nice office',
  gender: 'female',
  date1: new Date(),
  date2: new Date(),
};

export type AppRouterProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const AppRouter = ({ setTheme }: AppRouterProps) => {
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    console.log('values: ', values);
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<{ [key in keyof typeof initialValues]: string }> = {};
    (Object.keys(initialValues) as (keyof typeof initialValues)[]).forEach((k) => {
      if (!values[k]) {
        errors[k] = 'Required';
      }
    });
    return errors;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/border-radius" element={<BorderRadiusDemo setTheme={setTheme} />} />
      <Route
        path="/demos"
        element={
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
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
      <Route path="/login" element={<LoginDemo />} />
      <Route path="/signup" element={<SignUpDemo />} />
      <Route path="/snackbar" element={<SnackBarDemo />} />
      <Route path="/confirmation" element={<ConfirmationDemo />} />
    </Routes>
  );
};

export default AppRouter;
