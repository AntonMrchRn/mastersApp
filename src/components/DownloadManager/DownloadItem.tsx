import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { FileProps } from './index';
import { ProgressBar } from './ProgressBar';

import { styles } from './styles';

type DownloadItemProps = {
  file: FileProps;
};
export const DownloadItem: FC<DownloadItemProps> = ({ file }) => {
  const size = 100;
  const metric = 'Mb';
  const loading = true;

  return (
    <View style={styles.wrapper}>
      <View style={styles.head}>
        <View style={styles.iconTitleSize}>
          <View style={styles.iconContainer}></View>
          <View style={styles.titleSize}>
            <Text style={styles.title}>{file.name}</Text>
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
