import { TextFieldProps } from '@mui/material';
import { PickerValidDate } from '@mui/x-date-pickers';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import React from 'react';
import { usePragmaticFormProps, usePickerWithFormikProps } from '../hooks/formHooks';
import { RequiredFormikTextFields } from './PTextField';

export type PTimePickerProps = Omit<TimePickerProps<PickerValidDate>, 'renderInput' | 'value' | 'onChange'> &
  Required<Pick<TextFieldProps, 'name'>> &
  Pick<TextFieldProps, 'variant'>;

export const PTimePicker = (props: PTimePickerProps) => {
  const { formikProps, value } = usePragmaticFormProps(props.name);
  return <PTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PTimePickerWithFormikComp = (
  props: Omit<TimePickerProps<PickerValidDate>, 'onChange'> &
    RequiredFormikTextFields &
    Required<Pick<TextFieldProps, 'value' | 'name'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const modifiedProps = usePickerWithFormikProps(props) as TimePickerProps<PickerValidDate>;

  return props.name ? <TimePicker {...modifiedProps} /> : null;
};

export const PTimePickerMemo = React.memo(PTimePickerWithFormikComp);
