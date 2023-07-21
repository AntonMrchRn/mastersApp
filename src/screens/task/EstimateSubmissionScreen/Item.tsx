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
  canDelete?: boolean;
};
export const Item: FC<ItemProps> = ({
  title,
  description,
  count,
  sum,
  canDelete,
}) => {
  const theme = useTheme();
  return (
    <View>
      {canDelete && (
        <TouchableOpacity style={styles.trash}>
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
        name={'123'}
        variant={'text'}
        label={'Стоимость'}
        placeholder={'Стоимость'}
        hint={'Указывается в рублях за весь объем услуги'}
      />
      <Spacer size={20} separator="bottom" />
    </View>
  );
};
