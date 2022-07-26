import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { PTextField, ThemedTextFieldProps } from './PTextField';
import { useTheme } from '@mui/material';
import omit from 'lodash/omit';

export function PasswordInput(props: ThemedTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const togglePasswordVisible = () => {
    setShowPassword((visible) => !visible);
  };

  const themeInputProps =
    props.variant === 'outlined'
      ? omit(theme.components?.MuiTextField?.defaultProps?.InputProps, 'disableUnderline')
      : theme.components?.MuiTextField?.defaultProps?.InputProps;

  return (
    <PTextField
      type={showPassword ? 'text' : 'password'}
      fullWidth
      InputProps={{
        ...themeInputProps,
        endAdornment: (
          <IconButton aria-label="toggle visibility" onClick={togglePasswordVisible}>
            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
          </IconButton>
        ),
      }}
      {...props}
    />
  );
}
