import { Button, Typography } from '@mui/material';
import React from 'react';

export type SubmitButtonProps = {
  name?: string;
  text?: string;
  loading?: boolean;
  variant?: string;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { name, text, loading, variant } = props;
  if (!variant) {
    variant == 'contained';
  }
  if (!text) {
    text == 'Submit';
  }

  return (
    <Button name={name} disabled={loading} variant="contained" color="primary" type="submit">
      {loading ? 'insert spinner here' : <Typography>{text}</Typography>}
    </Button>
  );
};

export default SubmitButton;
