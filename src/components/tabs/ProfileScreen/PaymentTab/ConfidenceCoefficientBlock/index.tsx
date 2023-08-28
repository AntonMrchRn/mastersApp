import React, { FC } from 'react';
import { View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { Text, useTheme } from 'rn-ui-kit';

import { Scale100Icon } from '@/assets/icons/svg/profile/scales/Scale100Icon';
import { Scale105Icon } from '@/assets/icons/svg/profile/scales/Scale105Icon';
import { Scale110Icon } from '@/assets/icons/svg/profile/scales/Scale110Icon';
import { Scale115Icon } from '@/assets/icons/svg/profile/scales/Scale115Icon';
import { Scale120Icon } from '@/assets/icons/svg/profile/scales/Scale120Icon';

import { styles } from './styles';

type ConfidenceCoefficientBlockProps = { serviceMultiplier: number };
export const ConfidenceCoefficientBlock: FC<
  ConfidenceCoefficientBlockProps
> = ({ serviceMultiplier }) => {
  const theme = useTheme();
  const getColor = () => {
    switch (serviceMultiplier) {
      case 1:
        return '#FCB861';
      case 1.05:
        return '#FFD43C';
      case 1.1:
        return '#FDE20E';
      case 1.15:
        return '#C3E933';
      case 1.2:
        return '#78E955';
      default:
        return '#FCB861';
    }
  };
  const getScale = () => {
    switch (serviceMultiplier) {
      case 1:
        return <Scale100Icon />;
      case 1.05:
        return <Scale105Icon />;
      case 1.1:
        return <Scale110Icon />;
      case 1.15:
        return <Scale115Icon />;
      case 1.2:
        return <Scale120Icon />;
      default:
        return <Scale100Icon />;
    }
  };

  return (
    <ShadowedView style={styles.container}>
      <View style={styles.title}>
        <Text variant="title2" color={getColor()}>
          {serviceMultiplier.toFixed(2).replace('.', ',')}
        </Text>
        <Text variant="bodyMBold" color={theme.text.basic}>
          — коэффициент доверия
        </Text>
      </View>
      <View style={styles.scale}>{getScale()}</View>
      <Text variant="bodySRegular" color={theme.text.basic}>
        Действует в Общих задачах с типом «Первый отклик». Зависит от количества
        выполненных задач, качества работи скорости их выполнения. Чтобы
        повысить стоимость услуг выполняйте задачи качественно и в срок
      </Text>
    </ShadowedView>
  );
};
