import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormikHelpers, useFormikContext } from 'formik';
import { SignInCard, LoginFormValues } from '../components/SignInCard';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import { SnackBarContext } from '../context/snackbar';
import { ConfirmationServiceContext } from '../context/confirmation';
import OnBoardingCarosel from '../components/OnBoardingCarosel';
import OrchidLogo from '../images/OrchidLogo';
import { items } from '../constants/CarouselItems';
import { Colors } from '../constants/Colors';
import RightLink from '../components/RightLink';
const ImageTopLeft = require('../images/background_img_top_left.png');
const ImageTopRight = require('../images/background_img_top_right.png');
const ImageBottomRight = require('../images/background_img_bottom_right.png');
const ImageBottomLeft = require('../images/background_img_bottom_left.png');

const LoginDemo = () => {
  const navigate = useNavigate();
  const { saveUser, isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const { showSnack } = useContext(SnackBarContext);
  const { showConfirmationModal, setOpenId } = useContext(ConfirmationServiceContext);

  const handleLogin = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    console.log('values: ', values);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
            <Box mb={4}>
              <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="Default" />
                <Tab label="Customised" />
              </Tabs>
            </Box>
            {tabValue === 0 && (
              <>
                <Typography variant="h6" marginBottom={3.5}>
                  Default Sign In form
                </Typography>
                <Typography variant="body1" marginBottom={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
                <SignInCard
                  onSubmit={handleLogin}
                  onForgotPassword={handleForgotPassword}
                  onCreateAccount={handleCreateAccount}
                />
              </>
            )}
            {tabValue === 1 && (
              <>
                <Typography variant="h6" marginY={3.5}>
                  Customised Sign In
                </Typography>
                <SignInCard
                  onSubmit={handleLogin}
                  onCreateAccount={handleCreateAccount}
                  showStaySignedIn={true}
                  sx={{ backgroundColor: Colors.secondary.main, borderRadius: 0 }}
                  signInButtonProps={{ color: 'info' }}
                  createButtonProps={{ color: 'primary' }}
                  signInRowProps={{ sx: { mt: 0, mb: 1.5 } }}
                  inputVariant="outlined"
                >
                  <Typography variant="body1" marginBottom={4}>
                    Custom content inside the card
                  </Typography>
                  <CustomForgotLink />
                </SignInCard>
              </>
            )}
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

const CustomForgotLink = () => {
  const { values } = useFormikContext<LoginFormValues>();
  const handleClick = () => {
    console.log('current email value is: ', values.email);
  };
  return <RightLink label="Forgot My password" onClick={handleClick} />;
};

export default LoginDemo;
