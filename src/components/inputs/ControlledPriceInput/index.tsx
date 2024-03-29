import React from 'react';
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
  const onClear = () => {
    inputProps.onClear && inputProps.onClear();
    field.onChange('');
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    inputProps.onBlur && inputProps.onBlur(e);
    field.onBlur();
  };

  // в цене 7 целых чисел + после точки 2 числа
  const onChangeText = (text: string) => {
    const curText = text.includes(',') ? text.replace(',', '.') : text;
    const hasDot = curText.includes('.');
    const afterDots = curText.split('.')[1];
    if (afterDots && afterDots.length > 2) {
      field.onChange((+curText).toFixed());
    } else {
      const valid = /^\d*\.?(?:\d{1,2})?$/;
      const res = valid.test(curText);
      if (res) {
        field.onChange(curText.slice(0, hasDot ? 10 : 7));
      }
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
    />
  );
};

export default ControlledPriceInput;
