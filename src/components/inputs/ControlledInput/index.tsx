import React from 'react';
import { useController } from 'react-hook-form';

import { Input } from 'rn-ui-kit';
import { InputProps } from 'rn-ui-kit/lib/typescript/components/Input';

type ControlledInputProps = {
  name: string;
} & Omit<InputProps, 'value' | 'onChangeText' | 'onClear'>;

const ControlledInput = ({ name, ...inputProps }: ControlledInputProps) => {
  const { field } = useController({
    name,
  });

  return (
    <Input
      ref={field.ref}
      {...inputProps}
      value={field.value}
      onChangeText={field.onChange}
      onClear={() => field.onChange('')}
    />
  );
};

export default ControlledInput;
