import { FilledInputProps, TextFieldProps } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export const PDateTimePicker = (
  props: Omit<DateTimePickerProps<any, any>, 'renderInput' | 'value' | 'onChange'> & ThemedTextFieldProps,
) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDateTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PDateTimePickerWithFormikComp = (
  props: Omit<DateTimePickerProps<any, any>, 'renderInput' | 'onChange'> &
    ThemedTextFieldProps &
    RequiredFormikTextFields &
    Required<Pick<TextFieldProps, 'value'>>,
) => {
  const { name, value, handleChange, setFieldValue, onAccept, ...otherProps } = props;
  const handleDateChange = (dateValue: Date | null) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DateTimePicker
      onAccept={onAccept}
      value={value as Date}
      onChange={handleDateChange}
      renderInput={({ InputProps, variant, ...params }) => {
        if (otherProps.variant !== 'outlined') {
          (InputProps as Partial<FilledInputProps>).disableUnderline = true;
        }
        return <PTextField name={name} InputProps={{ ...InputProps }} {...params} />;
      }}
      {...otherProps}
    />
  ) : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
