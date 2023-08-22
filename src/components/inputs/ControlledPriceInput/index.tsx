import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { Input } from 'rn-ui-kit';
import { InputProps } from 'rn-ui-kit/lib/typescript/components/Input';

type ControlledPriceInputProps = {
  name: string;
} & Omit<InputProps, 'value' | 'onChangeText'>;

const ControlledPriceInput = ({
  name,
  ...inputProps
}: ControlledPriceInputProps) => {
  const { field } = useController({
    name,
  });
  const [hasDot, setHasDot] = useState(false);
  const onClear = () => {
    inputProps.onClear && inputProps.onClear();
    field.onChange('');
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    inputProps.onBlur && inputProps.onBlur(e);
    field.onBlur();
  };

  const onChangeText = (text: string) => {
    setHasDot(text.includes('.'));
    const valid = /^\d*\.?(?:\d{1,2})?$/;
    const res = valid.test(text);
    if (res) {
      field.onChange(text);
    }
  };

  return (
    <Input
      ref={field.ref}
      {...inputProps}
      onBlur={onBlur}
      onClear={onClear}
      value={field.value}
      onChangeText={onChangeText}
      maxLength={hasDot ? 8 : 6}
    />
  );
};

export default ControlledPriceInput;
