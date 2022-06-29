import React from 'react';
import { Button, Typography, ButtonProps } from '@mui/material';

export type SubmitButtonProps = {
  name?: string;
  text?: string;
  loading?: boolean;
} & ButtonProps;

export const SubmitButton = ({ name, text = 'Submit', loading, ...otherProps }: SubmitButtonProps) => {
  return (
    <Button name={name} disabled={loading} color="primary" type="submit" {...otherProps}>
      {loading ? 'insert spinner here' : <Typography>{text}</Typography>}
    </Button>
  );
};
