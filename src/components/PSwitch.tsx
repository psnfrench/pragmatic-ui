import { FormControlLabel, FormControlLabelProps, SwitchProps } from '@mui/material';
import Switch from '@mui/material/Switch';
import { FormikContextType, useFormikContext } from 'formik';
import get from 'lodash/get';
import React, { useCallback } from 'react';

export type RequiredFormikSwitchFields = Required<Pick<FormikContextType<unknown>, 'setFieldValue'>>;
export type ThemedSwitchProps = SwitchProps &
  Required<Pick<SwitchProps, 'name'>> & { label?: string } & {
    FormControlLabelProps?: Omit<FormControlLabelProps, 'label' | 'control'>;
  };

export const PSwitch = (props: ThemedSwitchProps) => {
  const { values, setFieldValue } = useFormikContext();
  const checked = get(values, props.name);

  return <PSwitchMemo checked={checked} setFieldValue={setFieldValue} {...props} />;
};

const PSwitchWithFormikComp = (props: ThemedSwitchProps & RequiredFormikSwitchFields & { checked: boolean }) => {
  const { name, label, checked, setFieldValue, FormControlLabelProps, ...otherProps } = props;
  const handleSwitchChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(target.name, target.checked);
    },
    [setFieldValue],
  );

  const renderSwitch = useCallback(() => {
    return <Switch name={name} checked={checked} onChange={handleSwitchChange} {...otherProps} />;
  }, [name, checked, handleSwitchChange, otherProps]);

  return name ? (
    label ? (
      <FormControlLabel control={renderSwitch()} label={label} {...FormControlLabelProps} />
    ) : (
      renderSwitch()
    )
  ) : null;
};

export const PSwitchMemo = React.memo(PSwitchWithFormikComp);
