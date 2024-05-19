import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { SignUpCard } from '../components/SignUpCard';
import { Colors } from '../constants/Colors';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function SignUpDemo() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log('handleSubmit');
  };
  const [selectedKey, setSelectedKey] = useState<string>();
  const goToLogin = () => {
    selectedKey == 'login';
    setSelectedKey(selectedKey);
    navigate('/login');
  };

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
