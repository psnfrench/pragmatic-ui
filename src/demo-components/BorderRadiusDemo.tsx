import { Box, Divider, TextField, Theme, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createPragmaticTheme } from '../constants/theme';

export type BorderDemoProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

function BorderRadiusDemo({ setTheme }: BorderDemoProps) {
  const defaultBorderRadius = 12;
  const [borderRadius, setBorderRadius] = useState(defaultBorderRadius);

  const handleBorderRadiusChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    value != '' ? setBorderRadius(parseInt(value)) : console.log('Number cannot be blank');
  };

  useEffect(() => {
    setTheme(createPragmaticTheme({ borderRadius }));
  }, [borderRadius, setTheme]);
  return (
    <Box>
      <Typography variant="h4">Border Radius</Typography>
      <Divider />
      <TextField label="Border Radius" onChange={handleBorderRadiusChange} value={borderRadius} type="number" />
    </Box>
  );
}

export default BorderRadiusDemo;
