import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { ProgressBar } from './ProgressBar';

import { styles } from './styles';

type DownloadManagerProps = {
  loading?: boolean;
  title: string;
  metric: string;
  size: number;
};
export const DownloadManager: FC<DownloadManagerProps> = ({
  loading,
  title,
  metric,
  size,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.iconTitleSize}>
          <View style={styles.iconContainer}></View>
          <View style={styles.titleSize}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.size}>
              <Text style={styles.regularText}>
                {size} {metric}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {loading && (
        <ProgressBar
          progress={10}
          currentSize={5}
          size={size}
          metric={metric}
        />
      )}
    </View>
  );
};
