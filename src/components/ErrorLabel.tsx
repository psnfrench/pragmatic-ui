import { Typography, styled } from '@mui/material';
import React from 'react';

const ErrorLabelComp = ({ errorText }: { errorText: string }) => {
  return (
    <Typography color="error" whiteSpace="pre-line">
      {errorText}
    </Typography>
  );
};

export const ErrorLabel = styled(ErrorLabelComp)({
  letterSpacing: '0.4px',
  fontWeight: 700,
  fontSize: 12,
  marginTop: 11,
});
