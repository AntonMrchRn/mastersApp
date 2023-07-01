import React, { FC } from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';

import { styles } from './styles';

export const Item: FC = () => {
  const theme = useTheme();
  return (
    <View>
      <Spacer size={'l'} />
      <Text variant={'captionRegular'} color={theme.text.neutral}>
        Категория услуг
      </Text>
      <Text
        variant={'bodyMBold'}
        color={theme.text.basic}
        style={styles.itemTitle}
      >
        Очень длинное название услуги, возможно на 2-3 строчки
      </Text>
      <Text variant={'bodySRegular'} color={theme.text.basic}>
        Описание услуги, раскрывающее подробности предаставляемой услуги
      </Text>
      <View style={styles.rowDirection}>
        <CubeIcon />
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.ml4}
        >
          Измеряется в шт.
        </Text>
      </View>
      <Button label={'Добавить'} size={'S'} style={styles.itemButton} />
      <Spacer size={15} separator="bottom" />
    </View>
  );
};
