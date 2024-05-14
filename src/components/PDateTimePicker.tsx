import { TextFieldProps } from '@mui/material';
import { PickerValidDate } from '@mui/x-date-pickers';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';
import { usePragmaticFormProps, usePickerWithFormikProps } from '../hooks/formHooks';
import { RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export type PDateTimePickerProps = Omit<DateTimePickerProps<PickerValidDate>, 'renderInput' | 'value' | 'onChange'> & {
  TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
} & Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PDateTimePicker = (props: PDateTimePickerProps) => {
  const { formikProps, value } = usePragmaticFormProps(props.name);
  return <PDateTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PDateTimePickerWithFormikComp = (
  props: Omit<DateTimePickerProps<PickerValidDate>, 'onChange'> & {
    TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
  } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'> &
    RequiredFormikTextFields,
) => {
  const modifiedProps = usePickerWithFormikProps(props) as DateTimePickerProps<PickerValidDate>;

  return props.name ? <DateTimePicker {...modifiedProps} /> : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
