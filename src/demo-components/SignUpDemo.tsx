import { Box, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { SignUpCard } from '../components/SignUpCard';
import { Colors } from '../constants/Colors';
import LandscapeIcon from '@mui/icons-material/Landscape';

function SignUpDemo() {
  const handleSubmit = () => {};
  const goToLogin = () => {};

  return (
    <Box>
      <Typography variant="h4">Sign in page</Typography>
      <Divider />
      <Grid container>
        <Grid item xs={6}>
          <SignUpCard onSubmit={handleSubmit} onGoToLogin={goToLogin} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: Colors.greyscale.coolGrey400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LandscapeIcon sx={{ fontSize: 300 }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUpDemo;
