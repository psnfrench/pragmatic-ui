import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { SignInCard, LoginFormValues } from '../components/SignInCard';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import { SnackBarContext } from '../context/snackbar';
import { ConfirmationServiceContext } from '../context/confirmation';

const LoginDemo = () => {
  const navigate = useNavigate();
  const { saveUser, isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { showSnack } = useContext(SnackBarContext);
  const { showConfirmationModal, setOpenId } = useContext(ConfirmationServiceContext);

  const handleLogin = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    saveUser(values);
    setSubmitting(false);
  };

  useEffect(() => {
    if (isLoggedIn && loading === false) {
      // once user has been logged in (after inital signout), redirect to dashboard
      navigate('/');
    }
  }, [isLoggedIn, navigate, loading]);

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      showSnack('Please enter an email address to send a link to', 'error');
      return;
    }
    const res = await showConfirmationModal({
      title: 'Forgot your Password',
      contentText: `Send forgot password link to ${email}?`,
    });
    if (res && res.confirmed === true) {
      try {
        setOpenId(undefined);
        showSnack('Please check your email for further instructions', 'success');
      } catch (error) {
        setOpenId(undefined);
      }
    }
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div>
      <SignInCard
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
};

export default LoginDemo;
