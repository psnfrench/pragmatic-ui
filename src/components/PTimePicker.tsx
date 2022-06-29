import { FilledInputProps, TextFieldProps } from '@mui/material';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields } from './PTextField';

export type PTimePickerProps = Omit<TimePickerProps<any, any>, 'renderInput' | 'value' | 'onChange'> &
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
  props: Omit<TimePickerProps<any, any>, 'renderInput' | 'onChange'> &
    RequiredFormikTextFields &
    Required<Pick<TextFieldProps, 'value' | 'name'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const { name, value, handleChange, setFieldValue, variant, ...otherProps } = props;
  const handleTimeChange = (timeValue: unknown, keyboardInputValue?: string | undefined) => {
    setFieldValue(name, timeValue);
  };
  return name ? (
    <TimePicker
      value={value as Date}
      onChange={handleTimeChange}
      renderInput={({ InputProps, ...params }) => {
        if (variant !== 'outlined') {
          (InputProps as Partial<FilledInputProps>).disableUnderline = true;
        }
        return <PTextField variant={variant} name={name} InputProps={{ ...InputProps }} {...params} />;
      }}
      {...otherProps}
    />
  ) : null;
};

export const PTimePickerMemo = React.memo(PTimePickerWithFormikComp);
