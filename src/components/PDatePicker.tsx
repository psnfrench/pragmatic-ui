import { FilledInputProps, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export type PDatePickerProps = Omit<DatePickerProps<any, any>, 'renderInput' | 'value' | 'onChange'> & {
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
  props: Omit<DatePickerProps<any, any>, 'renderInput' | 'onChange'> &
    RequiredFormikTextFields & {
      TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
    } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const { name, value, handleChange, setFieldValue, variant, TextFieldProps, ...otherProps } = props;
  const handleDateChange = (dateValue: unknown, keyboardInputValue?: string | undefined) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DatePicker
      value={value as Date}
      onChange={handleDateChange}
      renderInput={({ InputProps, ...params }) => {
        if (variant !== 'outlined') {
          (InputProps as Partial<FilledInputProps>).disableUnderline = true;
        }
        return (
          <PTextField variant={variant} name={name} InputProps={{ ...InputProps }} {...params} {...TextFieldProps} />
        );
      }}
      {...otherProps}
    />
  ) : null;
};

export const PDatePickerMemo = React.memo(PDatePickerWithFormikComp);
