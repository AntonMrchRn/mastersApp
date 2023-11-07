import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text, Tooltip, useTheme } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/estimate/InfoIcon';
import { configApp, deviceHeight, deviceWidth } from '@/constants/platform';
import { separateThousands } from '@/utils/separateThousands';

import { styles } from './styles';

const checkSlipper =
  deviceHeight < 680
    ? {
        x: deviceWidth * -0.28,
        y: deviceWidth - deviceWidth * 0.75 + 120,
      }
    : {
        x: deviceWidth * -0.179,
        y: deviceWidth - deviceWidth * 0.75 + 70,
      };

const coords = configApp.android
  ? checkSlipper
  : {
      x: deviceWidth * -0.168,
      y: deviceWidth - deviceWidth * 0.75 + 74,
    };

type EstimateTotalProps = {
  servicesSum: number;
  materialsSum: number;
  serviceMultiplier?: number;
};

export const EstimateTotal = ({
  servicesSum,
  materialsSum,
  serviceMultiplier,
}: EstimateTotalProps) => {
  const theme = useTheme();

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const onTooltipOpen = () => setIsTooltipVisible(true);
  const onTooltipClose = () => setIsTooltipVisible(false);

  const allSum = materialsSum + servicesSum;
  const allServiceSumMultiplierPure = serviceMultiplier
    ? servicesSum * serviceMultiplier
    : servicesSum;
  const allServiceSumMultiplier = separateThousands(
    allServiceSumMultiplierPure,
  );
  const allCurrentSum = separateThousands(allSum);

  return (
    <View style={styles.bottom}>
      <View style={styles.rowStart}>
        <View style={styles.estimate}>
          <Text variant="bodyMRegular" color={theme.text.basic}>
            Услуги
          </Text>
          {serviceMultiplier && (
            <Tooltip
              containerStyle={styles.tooltip}
              triangleEdge="bottom"
              triagnleAlign="start"
              coords={coords}
              onClose={onTooltipClose}
              isVisible={isTooltipVisible}
              title={`Ваш коэффициент доверия — ${serviceMultiplier
                .toFixed(2)
                .replace('.', ',')}`}
              text={`Зависит от количества выполненных задач, качества работ и скорости их выполнения. Чтобы повысить стоимость услуг выполняйте задачи качественно и в срок`}
            >
              <TouchableOpacity onPress={onTooltipOpen}>
                <InfoIcon />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
        <View style={styles.estimateSum}>
          {serviceMultiplier && serviceMultiplier !== 1 && (
            <Text variant="bodySRegular" style={styles.crossed}>
              {servicesSum} ₽
            </Text>
          )}
          <Text variant="bodyMRegular" color={theme.text.basic}>
            {allServiceSumMultiplier} ₽
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text variant="bodyMRegular" color={theme.text.basic}>
          Материалы
        </Text>
        <View>
          <Text variant="bodyMRegular" color={theme.text.basic}>
            {separateThousands(materialsSum)} ₽
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text variant="bodyMRegular" color={theme.text.accent}>
          ИТОГО
        </Text>
        <Text variant="bodyMRegular" color={theme.text.accent}>
          {allCurrentSum} ₽
        </Text>
      </View>
    </View>
  );
};
