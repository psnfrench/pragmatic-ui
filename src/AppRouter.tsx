import { Theme } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import './App.css';
import TextDemo from './demo-components/TextDemo';
import SelectDemo from './demo-components/SelectDemo';
import RadioDemo from './demo-components/RadioDemo';
import SignUpDemo from './demo-components/SignUpDemo';
import SnackBarDemo from './demo-components/SnackBarDemo';
import ConfirmationDemo from './demo-components/ConfirmationDemo';
import BorderRadiusDemo from './demo-components/BorderRadiusDemo';
import DateDemo from './demo-components/DateDemo';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginDemo from './demo-components/LoginDemo';
import SearchDemo from './demo-components/SearchDemo';
import FileDropZoneDemo from './demo-components/FileDropZoneDemo';
import { SubmitButton } from './components/SubmitButton';
import ComplexFilterDemo from './demo-components/ComplexFilterDemo';
import SwitchDemo from './demo-components/SwitchDemo';

const initialValues = {
  firstName: 'Sally',
  description: 'Works in accounts\nHas the nice office',
  tags: [],
  gender: 'female',
  date1: new Date(),
  date2: new Date(),
  staySignedIn: true,
};

export type AppRouterProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const AppRouter = ({ setTheme }: AppRouterProps) => {
  const handleSubmit = (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  const validate = (values: typeof initialValues) => {
    // eslint-disable-next-line no-unused-vars
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
          <>
            <ComplexFilterDemo />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextDemo />
                  <SelectDemo />
                  <DateDemo />
                  <RadioDemo />
                  <SwitchDemo />
                  <SearchDemo />
                  <FileDropZoneDemo />
                  <SubmitButton text="Submit Button" variant="contained" color="primary" loading={isSubmitting} />
                </form>
              )}
            </Formik>
          </>
        }
      />
      <Route path="/demos/test-sidebar" element={<SnackBarDemo />} />
      <Route path="/login" element={<LoginDemo />} />
      <Route path="/signup" element={<SignUpDemo />} />
      <Route path="/snackbar" element={<SnackBarDemo />} />
      <Route path="/confirmation" element={<ConfirmationDemo />} />
    </Routes>
  );
};

export default AppRouter;
