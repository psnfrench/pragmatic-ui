import { TextFieldProps } from '@mui/material/TextField';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import { useGetFormikTextFields, RequiredFormikTextFields, ThemedTextFieldProps } from '../components/PTextField';

export const usePragmaticFormProps = (fieldName: string) => {
  const getFormikTextFields = useGetFormikTextFields();
  const _props = useFormikContext();
  const formikProps = getFormikTextFields(_props);
  const value = get(_props.values, fieldName);
  return { value, formikProps };
};

export const usePickerWithFormikProps = (
  props: Omit<
    DatePickerProps<PickerValidDate> | DateTimePickerProps<PickerValidDate> | TimePickerProps<PickerValidDate>,
    'onChange'
  > &
    RequiredFormikTextFields & {
      TextFieldProps?: Omit<ThemedTextFieldProps, 'name'>;
    } & Required<Pick<TextFieldProps, 'name' | 'value'>> &
    Pick<TextFieldProps, 'variant'>,
) => {
  const { name, value, setFieldValue, variant, ...otherProps } = props;
  const onChange = (dateValue: unknown) => {
    setFieldValue(name, dateValue);
  };
  const slotProps = {
    textField: { InputProps: variant === 'outlined' ? undefined : { disableUnderline: true }, variant: variant },
  };
  return { value, onChange, slotProps, ...otherProps };
};
