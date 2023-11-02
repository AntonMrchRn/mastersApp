import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text, Tooltip, useTheme } from 'rn-ui-kit';

import QuestionIcon from '@/assets/icons/svg/screens/QuestionIcon';
import { hitSlop } from '@/constants/platform';

import styles from './style';

const payerTooltipCoords = { x: -10, y: 101 };

const NDSPayerTooltip = () => {
  const theme = useTheme();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const onTooltipOpen = () => setIsTooltipVisible(true);
  const onTooltipClose = () => setIsTooltipVisible(false);

  return (
    <Tooltip
      triangleEdge="bottom"
      triagnleAlign="center"
      coords={payerTooltipCoords}
      onClose={onTooltipClose}
      isVisible={isTooltipVisible}
      text={`Сумма НДС будет выделяться из итоговой \n суммы сметы по формуле:\n НДС = Сумма/120*20`}
    >
      <View style={styles.payerTooltip} onLayout={e => e.nativeEvent.layout.y}>
        <Text variant="bodyMRegular" style={styles.tooltipTitle}>
          Плательщик НДС
        </Text>
        <TouchableOpacity hitSlop={hitSlop} onPress={onTooltipOpen}>
          <QuestionIcon fill={theme.icons.neutral} />
        </TouchableOpacity>
      </View>
    </Tooltip>
  );
};

export default NDSPayerTooltip;
