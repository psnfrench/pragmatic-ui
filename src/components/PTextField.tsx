import { Box, IconButton, TextField, TextFieldProps, BoxProps, useTheme } from '@mui/material';
import { FormikContextType, FormikProps, useFormikContext } from 'formik';
import get from 'lodash/get';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorLabel } from './ErrorLabel';
import { Colors } from '../constants/Colors';

export type ThemedTextFieldProps = TextFieldProps & { BoxProps?: BoxProps; enableClear?: boolean } & Required<
    Pick<TextFieldProps, 'name'>
  >;
export const PTextField = (props: ThemedTextFieldProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PTextFieldMemo value={value} {...props} {...formikProps} />;
};

export type RequiredFormikTextFields = Required<
  Pick<FormikContextType<unknown>, 'setFieldValue' | 'handleBlur' | 'handleChange' | 'errors' | 'touched'>
>;

export const useGetFormikTextFields = () => {
  return function getFormikTextFields<T>({
    setFieldValue,
    handleBlur,
    handleChange,
    errors,
    touched,
  }: FormikProps<T>): RequiredFormikTextFields {
    return {
      setFieldValue,
      handleBlur,
      handleChange,
      errors,
      touched,
    };
  };
};
const PTextFieldWithFormikComp = (
  props: ThemedTextFieldProps & RequiredFormikTextFields & Required<Pick<TextFieldProps, 'value'>>,
) => {
  const {
    BoxProps: _BoxProps,
    name,
    enableClear = true,
    value,
    setFieldValue,
    handleBlur: formikHandleBlur,
    handleChange,
    errors,
    touched,
    ...otherProps
  } = props;
  const theme = useTheme();
  const [showClear, setShowClear] = useState(false);
  const isTouched = get(touched, name);
  const error = name && isTouched ? get(errors, name) : undefined;
  const defaultValue = props.select && props.SelectProps?.multiple ? [] : '';
  const handleClear = () => {
    setFieldValue(name, '', false);
  };
  const handleFocus = () => {
    setShowClear(true);
  };
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
    setShowClear(false);
    formikHandleBlur(e);
  };
  return name ? (
    <Box marginBottom={2.5} {..._BoxProps}>
      <TextField
        name={name}
        value={value !== undefined ? value : defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        hiddenLabel={!props.label}
        InputProps={{
          ...theme.components?.MuiTextField?.defaultProps?.InputProps,
          endAdornment:
            enableClear && showClear ? (
              <IconButton
                tabIndex={-1}
                sx={{ position: 'absolute', right: '15px' }}
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
              >
                <CloseIcon color="disabled" sx={{ color: Colors.greyscale.label }} />
              </IconButton>
            ) : null,
        }}
        error={!!error}
        {...otherProps}
      />
      {name && error ? <ErrorLabel errorText={error} /> : null}
    </Box>
  ) : null;
};

export const PTextFieldMemo = React.memo(PTextFieldWithFormikComp);

export type ThemedTextFieldReadOnlyProps = TextFieldProps & { BoxProps?: BoxProps } & Required<
    Pick<TextFieldProps, 'value'>
  >;

export const PTextFieldReadOnly = ({
  BoxProps: _BoxProps,
  value,
  ...otherProps
}: ThemedTextFieldReadOnlyProps & { value: string }) => {
  return (
    <Box marginBottom={2.5} {..._BoxProps}>
      <TextField value={value} disabled={true} {...otherProps} />
    </Box>
  );
};
