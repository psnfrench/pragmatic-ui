import { TextFieldProps } from '@mui/material';
import { PickerValidDate } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export type PDatePickerProps = Omit<DatePickerProps<Date>, 'value' | 'onChange'> & {
  TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
} & Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PDatePicker = (props: PDatePickerProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDatePickerMemo value={value} {...props} {...formikProps} />;
};

const PDatePickerWithFormikComp = (
  props: Omit<DatePickerProps<PickerValidDate>, 'onChange'> &
    RequiredFormikTextFields & {
      TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
    } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const { name, value, setFieldValue, variant, ...otherProps } = props;
  const handleDateChange = (dateValue: unknown) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DatePicker
      value={value as PickerValidDate}
      onChange={handleDateChange}
      slotProps={{
        textField: { InputProps: variant === 'outlined' ? undefined : { disableUnderline: true }, variant: variant },
      }}
      {...otherProps}
    />
  ) : null;
};

export const PDatePickerMemo = React.memo(PDatePickerWithFormikComp);
