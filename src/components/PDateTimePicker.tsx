import { TextFieldProps } from '@mui/material';
import { PickerValidDate } from '@mui/x-date-pickers';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export type PDateTimePickerProps = Omit<DateTimePickerProps<PickerValidDate>, 'renderInput' | 'value' | 'onChange'> & {
  TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
} & Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PDateTimePicker = (props: PDateTimePickerProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDateTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PDateTimePickerWithFormikComp = (
  props: Omit<DateTimePickerProps<PickerValidDate>, 'renderInput' | 'onChange'> & {
    TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
  } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'> &
    RequiredFormikTextFields,
) => {
  const { name, value, setFieldValue, variant, ...otherProps } = props;
  const handleDateChange = (dateValue: Date | null) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DateTimePicker
      value={value as PickerValidDate}
      onChange={handleDateChange}
      slotProps={{ textField: { InputProps: { disableUnderline: true }, variant: variant } }}
      {...otherProps}
    />
  ) : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
