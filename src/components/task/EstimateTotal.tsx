import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

type EstimateTotalProps = {
  allSum: number;
  materialsSum: number;
};
export const EstimateTotal: FC<EstimateTotalProps> = ({
  allSum,
  materialsSum,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    bottom: {
      gap: 8,
      marginTop: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.bottom}>
      <View style={styles.row}>
        <Text variant="bodySBold" color={theme.text.basic}>
          Всего по работам
        </Text>
        <Text variant="bodySBold" color={theme.text.basic}>
          {allSum} ₽
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="bodySBold" color={theme.text.basic}>
          Всего по материалам
        </Text>
        <Text variant="bodySBold" color={theme.text.basic}>
          {materialsSum} ₽
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="bodySBold" color={theme.text.accent}>
          ИТОГО
        </Text>
        <Text variant="bodySBold" color={theme.text.accent}>
          {allSum} ₽
        </Text>
      </View>
    </View>
  );
};
