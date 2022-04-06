import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function RightLink({ onClick, label }: { onClick: (obj: unknown) => void; label: string }) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Button size="small" variant="text" onClick={onClick}>
        <Typography sx={{ textDecoration: 'underline', fontSize: 12 }} variant="subtitle2">
          {label}
        </Typography>
      </Button>
    </Box>
  );
}

export default RightLink;
