import { TextFieldProps } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export const PDateTimePicker = (props: ThemedTextFieldProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDateTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PDateTimePickerWithFormikComp = (
  props: ThemedTextFieldProps & RequiredFormikTextFields & Required<Pick<TextFieldProps, 'value'>>,
) => {
  const { name, value, handleChange, setFieldValue, ...otherProps } = props;
  const handleDateChange = (dateValue: Date | null) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DateTimePicker
      value={value as Date}
      onChange={handleDateChange}
      InputProps={{ disableUnderline: true }}
      renderInput={(params) => <PTextField name={name} {...params} {...otherProps} />}
    />
  ) : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
