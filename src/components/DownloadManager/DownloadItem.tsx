import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { FileProps } from './index';
import { ProgressBar } from './ProgressBar';

type DownloadItemProps = {
  file: FileProps;
};
export const DownloadItem: FC<DownloadItemProps> = ({ file }) => {
  const size = 100;
  const metric = 'Mb';
  const loading = true;

  const theme = useTheme();

  const styles = StyleSheet.create({
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    iconContainer: {
      width: 52,
      height: 52,
      backgroundColor: theme.background.fieldMain,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconTitleSize: {
      flexDirection: 'row',
    },
    titleSize: {
      marginLeft: 8,
    },
    title: {
      color: theme.text.basic,
    },
    size: { marginTop: 4 },
    regularText: {
      fontFamily: 'Nunito Sans Regular',
      fontWeight: '400',
      fontSize: 13,
      lineHeight: 16,
      color: theme.text.neutral,
    },
  });

  return (
    <View>
      <View style={styles.head}>
        <View style={styles.iconTitleSize}>
          <View style={styles.iconContainer}></View>
          <View style={styles.titleSize}>
            <Text variant={'bodySBold'} style={styles.title}>
              {file.name}
            </Text>
            <View style={styles.size}>
              <Text variant={'captionRegular'}>
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
