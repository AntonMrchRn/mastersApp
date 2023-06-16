import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

type ProgressBarProps = {
  progress: number;
  recieved: number;
  size: number;
};
export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  recieved,
  size,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    regularText: {
      color: theme.text.neutral,
    },
    progressTextContainer: {
      marginTop: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressLine: {
      backgroundColor: theme.background.secondaryBadge,
      borderRadius: 8,
      width: '100%',
      height: 4,
    },
    progressFill: {
      backgroundColor: theme.text.secondary,
      borderRadius: 8,
      height: 4,
      width: `${progress}%`,
    },
  });
  return (
    <View>
      <View style={styles.progressLine}>
        <View style={styles.progressFill}></View>
      </View>
      <View style={styles.progressTextContainer}>
        <Text variant={'captionRegular'} style={styles.regularText}>
          загружено {prettyBytes(recieved)} / {prettyBytes(size)}
        </Text>
        <Text variant={'captionRegular'} style={styles.regularText}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};
