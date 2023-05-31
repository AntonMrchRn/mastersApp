import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type ProgressBarProps = {
  progress: number;
  currentSize: number;
  size: number;
  metric: string;
};
export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  currentSize,
  size,
  metric,
}) => {
  return (
    <View>
      <View style={styles.progressLine}>
        <View style={{ width: `${progress}%`, backgroundColor: 'red' }}></View>
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.regularText}>
          загружено {currentSize} {metric} / {size} {metric}
        </Text>
        <Text style={styles.regularText}>{progress}%</Text>
      </View>
    </View>
  );
};
