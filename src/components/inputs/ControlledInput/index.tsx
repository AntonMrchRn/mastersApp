import React from 'react';
import { useController } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { Input } from 'rn-ui-kit';
import { InputProps } from 'rn-ui-kit/lib/typescript/components/Input';

type ControlledInputProps = {
  name: string;
} & Omit<InputProps, 'value' | 'onChangeText'>;

const ControlledInput = ({ name, ...inputProps }: ControlledInputProps) => {
  const { field } = useController({
    name,
  });

  const onClear = () => {
    inputProps.onClear && inputProps.onClear();
    field.onChange('');
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    inputProps.onBlur && inputProps.onBlur(e);
    field.onBlur();
  };

  return (
    <Input
      ref={field.ref}
      {...inputProps}
      onBlur={onBlur}
      onClear={onClear}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

export default ControlledInput;
