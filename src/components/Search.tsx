import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';
import { PIcon } from '../images/PIcon';

const StyledTextField = styled(TextField)(() => ({
  '&.textField': {
    paddingTop: '0px !important',
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

  const InputProps = useMemo(() => {
    return {
      disableUnderline: true,
      startAdornment: <PIcon name="searchIcon" sx={{ marginRight: 1, marginLeft: 2 }} />,
      className: 'inputRoot',
      placeholder: placeholderText,
      ...otherProps.InputProps,
      sx: {
        borderRadius: '12px',
        height: '42px',
        backgroundColor: '#EDF1F6',
        ...otherProps.InputProps?.sx,
      },
    };
  }, [otherProps.InputProps, placeholderText]);

  return (
    <StyledTextField
      className="textField"
      variant="standard"
      value={searchValue}
      onChange={handleSearchChange}
      {...otherProps}
      InputProps={InputProps}
    />
  );
};
