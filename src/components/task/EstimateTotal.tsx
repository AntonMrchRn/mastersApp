import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text, Tooltip, useTheme } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/estimate/InfoIcon';

type EstimateTotalProps = {
  allSum: number;
  materialsSum: number;
  serviceMultiplier?: number;
};
export const EstimateTotal: FC<EstimateTotalProps> = ({
  allSum,
  materialsSum,
  serviceMultiplier = 1,
}) => {
  const theme = useTheme();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const onTooltipOpen = () => setIsTooltipVisible(true);
  const onTooltipClose = () => setIsTooltipVisible(false);
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
    estimate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    estimateSum: { gap: 4 },
    crossed: {
      color: '#1B1B1B',
      fontFamily: 'Nunito Sans',
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 20,
      textDecorationLine: 'line-through',
    },
  });
  const coords = { x: -200, y: 160 };
  const allSumMultiplier = (allSum * serviceMultiplier).toString().includes('.')
    ? (allSum * serviceMultiplier).toFixed(2)
    : allSum * serviceMultiplier;
  return (
    <View style={styles.bottom}>
      <View style={styles.row}>
        <View style={styles.estimate}>
          <Text variant="bodySBold" color={theme.text.basic}>
            Всего по услугам
          </Text>
          <TouchableOpacity onPress={onTooltipOpen}>
            <InfoIcon />
          </TouchableOpacity>
          <Tooltip
            triangleEdge="bottom"
            triagnleAlign="center"
            coords={coords}
            onClose={onTooltipClose}
            isVisible={isTooltipVisible}
            title={`Ваш коэффициент доверия — ${serviceMultiplier}`}
            text={`Зависит от количества выполненных задач, качества работ и скорости их выполнения. Чтобы повысить стоимость услуг выполняйте задачи качественно и в срок`}
          />
        </View>
        <View style={styles.estimateSum}>
          {serviceMultiplier !== 1 && (
            <RNText style={styles.crossed}>{allSum} ₽</RNText>
          )}
          <Text variant="bodySBold" color={theme.text.basic}>
            {allSumMultiplier} ₽
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text variant="bodySBold" color={theme.text.basic}>
          Всего по материалам
        </Text>
        <View>
          <Text variant="bodySBold" color={theme.text.basic}>
            {materialsSum} ₽
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text variant="bodySBold" color={theme.text.accent}>
          ИТОГО
        </Text>
        <Text variant="bodySBold" color={theme.text.accent}>
          {allSumMultiplier} ₽
        </Text>
      </View>
    </View>
  );
};
