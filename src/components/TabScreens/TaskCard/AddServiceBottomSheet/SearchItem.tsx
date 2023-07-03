import React from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { ServiceItem } from '@/components/task/ServiceItem';

import { styles } from './styles';

export const SearchItem = () => {
  const theme = useTheme();
  return (
    <View>
      <Text variant={'title3'} color={theme.text.basic}>
        Результаты поиска
      </Text>
      <Text
        variant={'bodySRegular'}
        color={theme.text.neutral}
        style={styles.mv8}
      >
        Найдено 16 совпадений
      </Text>
      <View>
        <ServiceItem />
        <Button label={'Добавить'} size={'S'} style={styles.itemButton} />
        <Spacer size={15} separator="bottom" />
      </View>
    </View>
  );
};
