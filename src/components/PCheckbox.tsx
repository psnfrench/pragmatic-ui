import { FormControlLabel, CheckboxProps } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormikContextType, useFormikContext } from 'formik';
import get from 'lodash/get';
import React, { useCallback } from 'react';

export type RequiredFormikCheckboxFields = Required<Pick<FormikContextType<unknown>, 'setFieldValue'>>;
export type ThemedCheckboxProps = CheckboxProps & Required<Pick<CheckboxProps, 'name'>> & { label?: string };

export const PCheckbox = (props: ThemedCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext();
  const checked = get(values, props.name);

  return <PCheckboxMemo checked={checked} setFieldValue={setFieldValue} {...props} />;
};

const PCheckboxWithFormikComp = (props: ThemedCheckboxProps & RequiredFormikCheckboxFields & { checked: boolean }) => {
  const { name, label, checked, setFieldValue, ...otherProps } = props;
  const handleCheckBoxChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(target.name, target.checked);
  };

  const renderCheckBox = useCallback(() => {
    return <Checkbox name={name} checked={checked} onChange={handleCheckBoxChange} {...otherProps} />;
  }, [name, checked, handleCheckBoxChange]);

  return name ? label ? <FormControlLabel control={renderCheckBox()} label={label} /> : renderCheckBox() : null;
};

export const PCheckboxMemo = React.memo(PCheckboxWithFormikComp);
