import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';

export const ServiceItem: FC = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    ml4: {
      marginLeft: 4,
    },
    rowDirection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    itemTitle: {
      marginVertical: 8,
    },
    items: {
      gap: 4,
    },
  });

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
      <View style={styles.items}>
        <View style={styles.rowDirection}>
          <PriceIcon />
          <Text
            variant={'bodySRegular'}
            color={theme.text.neutral}
            style={styles.ml4}
          >
            100r в шт.
          </Text>
        </View>
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
      </View>
    </View>
  );
};
