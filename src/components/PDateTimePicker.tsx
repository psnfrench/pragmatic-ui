import { TextFieldProps, BoxProps } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';
import { useGetFormikTextFields, PTextField, RequiredFormikTextFields } from './PTextField';

export type ThemedTextFieldProps = TextFieldProps & { BoxProps?: BoxProps; enableClear?: boolean } & Required<
    Pick<TextFieldProps, 'name'>
  >;
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
  const { name, value, handleChange, ...otherProps } = props;
  const defaultValue = props.select && props.SelectProps?.multiple ? [] : '';
  return name ? (
    <DateTimePicker
      value={value || defaultValue}
      onChange={handleChange}
      renderInput={(params) => <PTextField name={name} {...params} {...otherProps} />}
    />
  ) : null;
};

export const PDateTimePickerMemo = React.memo(PDateTimePickerWithFormikComp);
