import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { TrashIcon } from '@/assets/icons/svg/estimate/TrashIcon';
import ControlledInput from '@/components/inputs/ControlledInput';

import { styles } from './styles';

type ItemProps = {
  title: string;
  description?: string;
  count: number;
  sum: number;
  name: string;
  canDelete?: boolean;
  error: string;
  onDelete: () => void;
};
export const Item: FC<ItemProps> = ({
  title,
  description,
  count,
  sum,
  canDelete,
  name,
  error,
  onDelete,
}) => {
  const theme = useTheme();
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
          {count} шт.
        </Text>
      </View>
      <View style={styles.char}>
        <CalculatorIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          {sum} ₽ (изначальная стоимость)
        </Text>
      </View>
      <Spacer size={16} />
      <ControlledInput
        name={name}
        variant={'text'}
        label={'Стоимость'}
        placeholder={'Стоимость'}
        hint={error || 'Указывается в рублях за весь объем услуги'}
        isError={!!error}
      />
      <Spacer size={20} separator="bottom" />
    </View>
  );
};
