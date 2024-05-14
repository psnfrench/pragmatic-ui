import { TextFieldProps } from '@mui/material';
import { PickerValidDate } from '@mui/x-date-pickers';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, RequiredFormikTextFields } from './PTextField';

export type PTimePickerProps = Omit<TimePickerProps<PickerValidDate>, 'renderInput' | 'value' | 'onChange'> &
  Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PTimePicker = (props: PTimePickerProps) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PTimePickerWithFormikComp = (
  props: Omit<TimePickerProps<PickerValidDate>, 'onChange'> &
    RequiredFormikTextFields &
    Required<Pick<TextFieldProps, 'value' | 'name'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const { name, value, setFieldValue, variant, ...otherProps } = props;
  const handleTimeChange = (timeValue: unknown) => {
    setFieldValue(name, timeValue);
  };
  return name ? (
    <TimePicker
      value={value as PickerValidDate}
      onChange={handleTimeChange}
      slotProps={{ textField: { InputProps: { disableUnderline: true }, variant: variant } }}
      {...otherProps}
    />
  ) : null;
};

export const PTimePickerMemo = React.memo(PTimePickerWithFormikComp);
