import { TextField, TextFieldProps, styled, InputProps } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';
import { PIcon } from '../images/PIcon';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '&.textField': {
    paddingTop: '0px !important',
  },
  '& .inputRoot': {
    borderRadius: 12,
    height: '42px',
    backgroundColor: '#EDF1F6',
  },
}));

export type SearchProps = {
  onChange:
    | Required<Pick<TextFieldProps, 'onChange'>>
    | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholderText?: string;
} & TextFieldProps;

export const Search = ({ onChange, placeholderText, ...otherProps }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const delayedQuery = useMemo(() => debounce(onChange, 500), [onChange]);
  // const classes = useStyles();
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    delayedQuery(event);
    setSearchValue(event.target.value);
  };

  return (
    <StyledTextField
      className="textField"
      variant="standard"
      value={searchValue}
      onChange={handleSearchChange}
      InputProps={{
        disableUnderline: true,
        startAdornment: <PIcon name="searchIcon" sx={{ marginRight: 1, marginLeft: 2 }} />,
        className: 'inputRoot',
        placeholder: placeholderText,
        ...otherProps.InputProps,
      }}
      {...otherProps}
    />
  );
};
