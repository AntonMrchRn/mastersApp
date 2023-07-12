import React from 'react';
import { View } from 'react-native';

import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

type ProgressBarProps = {
  progress: number;
  loaded: number;
  size: number;
};

import styles from './style';

export const ProgressBar = ({ progress, loaded, size }: ProgressBarProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressLine,
          { backgroundColor: theme.background.secondaryBadge },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.text.secondary, width: `${progress}%` },
          ]}
        />
      </View>
      <View style={styles.progressTextContainer}>
        <Text variant={'captionRegular'} style={{ color: theme.text.neutral }}>
          загружено {prettyBytes(loaded)} / {prettyBytes(size)}
        </Text>
        <Text variant={'captionRegular'} style={{ color: theme.text.neutral }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};
