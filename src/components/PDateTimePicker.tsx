import { FilledInputProps, TextFieldProps } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields, ThemedTextFieldProps } from './PTextField';

export const PDateTimePicker = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Omit<DateTimePickerProps<any, any>, 'renderInput' | 'value' | 'onChange'> & {
    TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
  } & Required<Pick<TextFieldProps, 'name'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, props.name);

  return <PDateTimePickerMemo value={value} {...props} {...formikProps} />;
};

const PDateTimePickerWithFormikComp = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Omit<DateTimePickerProps<any, any>, 'renderInput' | 'onChange'> & {
    TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
  } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'> &
    RequiredFormikTextFields,
) => {
  const { name, value, variant, setFieldValue, ...otherProps } = props;
  const handleDateChange = (dateValue: Date | null) => {
    setFieldValue(name, dateValue);
  };
  return name ? (
    <DateTimePicker
      value={value as Date}
      onChange={handleDateChange}
      renderInput={({ InputProps, ...params }) => {
        if (variant !== 'outlined') {
          (InputProps as Partial<FilledInputProps>).disableUnderline = true;
        }
        return (
          <PTextField
            variant={variant}
            name={name}
            InputProps={{ ...InputProps }}
            {...params}
            {...props.TextFieldProps}
          />
        );
      }}
      {...otherProps}
    />
  ) : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
