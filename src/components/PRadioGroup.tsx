import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  FormControlLabelProps,
} from '@mui/material';
import { FormikContextType, useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';

type RequiredFormikRadioFields = Required<Pick<FormikContextType<unknown>, 'handleChange'>> &
  Required<Pick<RadioGroupProps, 'value'>>;
type ThemedRadioControl = Omit<FormControlLabelProps, 'control'> & Required<Pick<FormControlLabelProps, 'value'>>;
type ThemedRadioGroupProps = RadioGroupProps &
  Required<Pick<RadioGroupProps, 'name'>> & {
    formLabel?: string;
    radioButtons: ThemedRadioControl[];
  };

const PRadioGroupWithFormikComp = ({
  name,
  value,
  formLabel,
  radioButtons,
  handleChange,
  ...otherProps
}: ThemedRadioGroupProps & RequiredFormikRadioFields) => {
  return (
    <FormControl>
      {formLabel && <FormLabel>{formLabel}</FormLabel>}
      <RadioGroup row name={name} value={value} onChange={handleChange} {...otherProps}>
        {radioButtons.map((radioButton) => (
          <FormControlLabel key={radioButton.value.toString()} control={<Radio />} {...radioButton} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export const PRadioGroupMemo = React.memo(PRadioGroupWithFormikComp);

export const PRadioGroup = (props: ThemedRadioGroupProps) => {
  const { values, handleChange } = useFormikContext();
  const value = get(values, props.name);
  return <PRadioGroupMemo handleChange={handleChange} value={value} {...props} />;
};
