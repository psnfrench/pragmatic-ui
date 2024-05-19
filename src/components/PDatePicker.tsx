import { TextFieldProps } from '@mui/material/TextField';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { usePragmaticFormProps, usePickerWithFormikProps } from '../hooks/formHooks';
import { RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export type PDatePickerProps = Omit<DatePickerProps<Date>, 'value' | 'onChange'> & {
  TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
} & Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PDatePicker = (props: PDatePickerProps) => {
  const { formikProps, value } = usePragmaticFormProps(props.name);
  return <PDatePickerMemo value={value} {...props} {...formikProps} />;
};

const PDatePickerWithFormikComp = (
  props: Omit<DatePickerProps<PickerValidDate>, 'onChange'> &
    RequiredFormikTextFields & {
      TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
    } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const modifiedProps = usePickerWithFormikProps(props) as DatePickerProps<PickerValidDate>;
  return props.name ? <DatePicker {...modifiedProps} /> : null;
};

export const PDatePickerMemo = React.memo(PDatePickerWithFormikComp);
