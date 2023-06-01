/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';

import { FileProps } from './index';
import { ProgressBar } from './ProgressBar';

type DownloadItemProps = {
  file: FileProps;
};
export const DownloadItem: FC<DownloadItemProps> = ({ file }) => {
  const size = 100;
  const metric = 'Mb';
  const loading = true;
  const onDevice = false;
  const canDownload = false;

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
      color: theme.text.neutral,
    },
  });

  const handleDownload = () => {};
  const handleDelete = () => {};
  const handleStop = () => {};

  const getIcon = () => {
    if (loading) {
      return (
        <TouchableOpacity onPress={handleStop}>
          <CloseFileIcon />
        </TouchableOpacity>
      );
    }
    if (onDevice) {
      return (
        <TouchableOpacity onPress={handleDelete}>
          <DeleteFileIcon />
        </TouchableOpacity>
      );
    }
    if (canDownload) {
      return (
        <TouchableOpacity onPress={handleDownload}>
          <DownloadFileIcon />
        </TouchableOpacity>
      );
    }
    return null;
  };

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
              <Text variant={'captionRegular'} style={styles.regularText}>
                {size} {metric}
              </Text>
            </View>
          </View>
        </View>
        {getIcon()}
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
