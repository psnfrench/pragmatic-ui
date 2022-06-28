import { Autocomplete, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { PropsOf } from '@emotion/react';
import { PTextField, ThemedTextFieldProps } from 'pragmatic-ui';
import makeStyles from '@mui/styles/makeStyles';
export type PSelectAsyncProps = Omit<PropsOf<typeof Autocomplete>, 'renderInput'> &
  Required<Pick<TextFieldProps, 'name'>> &
  Pick<ThemedTextFieldProps, 'label' | 'variant'>;

const useStyles = makeStyles({
  popper: {
    '& .MuiPaper-root': {
      borderRadius: '12px',
      marginTop: '5px',
      backgroundColor: '#fff !important',
    },
    '& ul > li.MuiAutocomplete-option.Mui-focused': {
      backgroundColor: '#F7F7FC !important',
    },
    '& ul > li.MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: '#F7F7FC !important',
    },
    '& ul > li.MuiAutocomplete-option:hover': {
      backgroundColor: '#F7F7FC !important',
    },
  },
  root: {
    '& .MuiAutocomplete-inputRoot': {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
    '& .MuiAutocomplete-input': {
      paddingTop: '16px !important',
      paddingBottom: '16px !important',
    },
  },
});

export const PSelectAsync = React.forwardRef((props: PSelectAsyncProps, ref) => {
  const { placeholder, name, label, variant, ...otherProps } = props;
  const { handleChange } = useFormikContext();
  const classes = useStyles();

  return (
    <Autocomplete
      fullWidth
      disablePortal
      onChange={handleChange}
      classes={{ popper: classes.popper, root: classes.root }}
      renderInput={({ InputProps, ...otherParams }) => (
        <PTextField
          placeholder={placeholder}
          InputProps={{ ...InputProps, disableUnderline: true }}
          name={name}
          label={label}
          variant={variant}
          {...otherParams}
        />
      )}
      ref={ref}
      {...otherProps}
    />
  );
});
PSelectAsync.displayName = 'PSelectAsync';
