import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { PTextField } from '../components/PTextField';
import { useFormikContext } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

function SelectDemo() {
  const tags = useRef(['music', 'movies', 'funny', 'action', 'comedy']).current;
  const { values } = useFormikContext<{ tags: string[] }>();
  return (
    <Box>
      <Typography variant="h4">Select Demo</Typography>
      <Divider />
      <PTextField name="tags" label="Tags" select sx={{ minWidth: 360 }} SelectProps={{ multiple: true }}>
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={values.tags.includes(tag)} />
            {tag}
          </MenuItem>
        ))}
      </PTextField>
    </Box>
  );
}

export default SelectDemo;
