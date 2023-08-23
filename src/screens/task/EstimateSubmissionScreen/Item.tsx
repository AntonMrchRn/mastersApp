import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Input, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { TrashIcon } from '@/assets/icons/svg/estimate/TrashIcon';

import { styles } from './styles';

type ItemProps = {
  title: string;
  description?: string;
  count: number;
  sum: number;
  canDelete?: boolean;
  error: boolean | undefined;
  onDelete: () => void;
  value?: string;
  onChangeText: (text: string) => void;
  measure: string;
};
export const Item: FC<ItemProps> = ({
  title,
  description,
  count,
  sum,
  canDelete,
  error,
  value,
  onDelete,
  onChangeText,
  measure,
}) => {
  const theme = useTheme();

  const onClear = () => {
    onChangeText('');
  };

  const handleChangeText = (text: string) => {
    const hasDot = text.includes('.');
    const valid = /^\d*\.?(?:\d{1,2})?$/;
    const res = valid.test(text);
    if (res) {
      onChangeText(text.slice(0, hasDot ? 10 : 7));
    }
  };

  return (
    <View>
      {canDelete && (
        <TouchableOpacity
          style={styles.trash}
          onPress={onDelete}
          hitSlop={{
            bottom: 20,
            left: 20,
            right: 20,
            top: 20,
          }}
        >
          <TrashIcon />
        </TouchableOpacity>
      )}
      <Spacer size={20} />
      <Text variant="captionRegular" color={theme.text.neutral}>
        Категория услуг
      </Text>
      <Text
        variant="bodyMBold"
        style={styles.itemTitle}
        color={theme.text.basic}
      >
        {title}
      </Text>
      {description && (
        <Text variant="bodySRegular" color={theme.text.basic}>
          {description}
        </Text>
      )}
      <View style={styles.char}>
        <CubeIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          {count} {measure.toLowerCase()}
        </Text>
      </View>
      <View style={styles.char}>
        <CalculatorIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          {sum} ₽ (изначальная стоимость)
        </Text>
      </View>
      <Spacer size={16} />
      <Input
        variant={'text'}
        keyboardType="numeric"
        maxLength={10}
        label={'Стоимость'}
        placeholder={'Стоимость'}
        hint={
          error
            ? 'Для подачи сметы необходимо заполнить все поля'
            : 'Указывается в рублях за весь объем услуги'
        }
        isError={!!error}
        value={value}
        onChangeText={handleChangeText}
        onClear={onClear}
      />
      <Spacer size={20} separator="bottom" />
    </View>
  );
};
