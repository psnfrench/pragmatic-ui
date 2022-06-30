import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { SignInCard, LoginFormValues } from '../components/SignInCard';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import { SnackBarContext } from '../context/snackbar';
import { ConfirmationServiceContext } from '../context/confirmation';
import OnBoardingCarosel from '../components/OnBoardingCarosel';
import OrchidLogo from '../images/OrchidLogo';
import slider1 from '../images/slider1';
import slider2 from '../images/slider2';
import slider3 from '../images/slider3';
const ImageTopLeft = require('../images/background_img_top_left.png');
const ImageTopRight = require('../images/background_img_top_right.png');
const ImageBottomRight = require('../images/background_img_bottom_right.png');
const ImageBottomLeft = require('../images/background_img_bottom_left.png');

const items = [
  { headerText: 'Slider 1', bodyText: 'Body 1', image: slider1, bodyColor: 'red', headerColor: 'red' },
  { headerText: 'Slider 2', bodyText: 'Body 2', image: slider2, bodyColor: 'white', headerColor: 'red' },
  { headerText: 'Slider 3', bodyText: 'Body 3', image: slider3, bodyColor: 'red', headerColor: 'white' },
];

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
      <Box display="flex" flexDirection="row" flex={1}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            width: '55%',
            background: (theme) =>
              `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${theme.palette.info.main};`,
          }}
        >
          <Box padding={5}>
            <OrchidLogo />
          </Box>
          <Box paddingX={18} flex={1} display="flex" flexDirection="column">
            <Typography variant="h6" marginBottom={3.5}>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" marginBottom={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
            </Typography>
            <SignInCard
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
              onCreateAccount={handleCreateAccount}
            />
          </Box>
        </Box>
        <Box sx={{ width: '45%' }}>
          <OnBoardingCarosel
            items={items}
            imageBottomLeft={ImageBottomLeft}
            imageBottomRight={ImageBottomRight}
            imageTopLeft={ImageTopLeft}
            imageTopRight={ImageTopRight}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LoginDemo;
