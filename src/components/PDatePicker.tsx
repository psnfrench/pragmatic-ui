import { FilledInputProps, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export const PDatePicker = (props: ThemedTextFieldProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDatePickerMemo value={value} {...props} {...formikProps} />;
};

const PDatePickerWithFormikComp = (
  props: ThemedTextFieldProps & RequiredFormikTextFields & Required<Pick<TextFieldProps, 'value'>>,
) => {
  const { name, value, handleChange, setFieldValue, ...otherProps } = props;
  const handleDateChange = (dateValue: Date | null) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DatePicker
      value={value as Date}
      onChange={handleDateChange}
      renderInput={({ InputProps, variant, ...params }) => {
        if (otherProps.variant !== 'outlined') {
          (InputProps as Partial<FilledInputProps>).disableUnderline = true;
        }
        return <PTextField name={name} InputProps={{ ...InputProps }} {...params} {...otherProps} />;
      }}
    />
  ) : null;
};

export const PDatePickerMemo = React.memo(PDatePickerWithFormikComp);
