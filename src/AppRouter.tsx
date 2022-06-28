import { Theme } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import React, { useContext } from 'react';
import './App.css';
import TextDemo from './demo-components/TextDemo';
import RadioDemo from './demo-components/RadioDemo';
import SignUpDemo from './demo-components/SignUpDemo';
import SnackBarDemo from './demo-components/SnackBarDemo';
import ConfirmationDemo from './demo-components/ConfirmationDemo';
import BorderRadiusDemo from './demo-components/BorderRadiusDemo';
import DateDemo from './demo-components/DateDemo';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserContext from './context/user';
import LoginDemo from './demo-components/LoginDemo';
import NewDemos from './demo-components/NewDemos';
import SubmitButton from './components/SubmitButton';

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
  const { isLoggedIn } = useContext(UserContext);

  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    console.log('values: ', values);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/border-radius" element={<BorderRadiusDemo setTheme={setTheme} />} />
      <Route
        path="/demos"
        element={
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextDemo />
                <DateDemo />
                <RadioDemo />
                <NewDemos />
                <SubmitButton text="Submit Button" />
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
