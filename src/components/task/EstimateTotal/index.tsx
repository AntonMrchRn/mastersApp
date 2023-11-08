import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text, Tooltip, useTheme } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/estimate/InfoIcon';
import { deviceWidth } from '@/constants/platform';
import { separateThousands } from '@/utils/separateThousands';

import { styles } from './styles';

const coords = {
  x: deviceWidth * -0.08,
  y: deviceWidth - deviceWidth * 0.75 + 58,
};

type EstimateTotalProps = {
  servicesSum: number;
  materialsSum: number;
  serviceMultiplier?: number;
  withNDS?: boolean;
};

export const EstimateTotal = ({
  servicesSum,
  materialsSum,
  serviceMultiplier,
  withNDS,
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
  const NDSSum = separateThousands(allSum / 6).replace('.', ',');
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
      <View style={{ gap: 4 }}>
        <View style={styles.row}>
          <Text variant="bodyMRegular" color={theme.text.accent}>
            ИТОГО
          </Text>
          <Text variant="bodyMRegular" color={theme.text.accent}>
            {allCurrentSum} ₽
          </Text>
        </View>
        {withNDS && (
          <View style={styles.row}>
            <Text variant="captionRegular" color={theme.text.neutral}>
              В том числе НДС 20%
            </Text>
            <Text variant="captionRegular" color={theme.text.neutral}>
              {NDSSum} ₽
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
