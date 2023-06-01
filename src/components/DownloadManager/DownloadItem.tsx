/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DOCIcon } from '@/assets/icons/svg/files/DOCIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';
import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { JPGIcon } from '@/assets/icons/svg/files/JPGIcon';
import { PDFIcon } from '@/assets/icons/svg/files/PDFIcon';
import { PNGIcon } from '@/assets/icons/svg/files/PNGIcon';
import { PPTIcon } from '@/assets/icons/svg/files/PPTIcon';
import { XLSIcon } from '@/assets/icons/svg/files/XLSIcon';
import { ZIPIcon } from '@/assets/icons/svg/files/ZIPIcon';

import { FileProps } from './index';
import { ProgressBar } from './ProgressBar';

type DownloadItemProps = {
  file: FileProps;
};
export const DownloadItem: FC<DownloadItemProps> = ({ file }) => {
  const theme = useTheme();

  const title = `${file.name}.${file.extension}`;
  const size = 100;
  const metric = 'Mb';
  const loading = true;
  const onDevice = false;
  const canDownload = false;

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

  const getIcon = () => {
    switch (file.extension) {
      case 'pdf':
        return <PDFIcon color={theme.icons.accent} />;
      case 'doc':
        return <DOCIcon color={theme.icons.accent} />;
      case 'png':
        return <PNGIcon color={theme.icons.accent} />;
      case 'xls':
        return <XLSIcon color={theme.icons.accent} />;
      case 'ppt':
        return <PPTIcon color={theme.icons.accent} />;
      case 'jpg':
        return <JPGIcon color={theme.icons.accent} />;
      case 'zip':
        return <ZIPIcon color={theme.icons.accent} />;
      default:
        return <FileIcon color={theme.icons.accent} />;
    }
  };

  const handleDownload = () => {};
  const handleDelete = () => {};
  const handleStop = () => {};

  const getAction = () => {
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
          <View style={styles.iconContainer}>{getIcon()}</View>
          <View style={styles.titleSize}>
            <Text variant={'bodySBold'} style={styles.title}>
              {title}
            </Text>
            <View style={styles.size}>
              <Text variant={'captionRegular'} style={styles.regularText}>
                {size} {metric}
              </Text>
            </View>
          </View>
        </View>
        {getAction()}
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
