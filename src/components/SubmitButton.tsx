import React from 'react';
import { Button, Typography, ButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export type SubmitButtonProps = {
  name?: string;
  text?: string;
  loading?: boolean;
} & ButtonProps;

export const SubmitButton = ({ name, text, loading, children, ...otherProps }: SubmitButtonProps) => {
  return (
    <Button name={name} disabled={loading} color="primary" type="submit" {...otherProps}>
      {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
      {text}
      {children}
    </Button>
  );
};
