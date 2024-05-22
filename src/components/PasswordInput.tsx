import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { PTextField, ThemedTextFieldProps } from './PTextField';
import omit from 'lodash/omit';
import { useTheme } from '@mui/material/styles';
import PIcon from '../images/PIcon';

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
            <PIcon name={showPassword ? 'eyeClosed' : 'eyeOpen'} size={24} />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
}
