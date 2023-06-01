/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

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
  const [onDevice, setOnDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const fileType = file?.extensionOriginal || '';
  const title = `${file.name}.${fileType}`;
  const size = 100;
  const canDownload = !!file.url;
  const MASTERS_PATH = '/storage/emulated/0/Download/Masters';

  const hasOnDevice = () => {
    ReactNativeBlobUtil.fs.ls(MASTERS_PATH).then(files => {
      const res = files.find(file => file === title);
      setOnDevice(!!res);
    });
  };

  useEffect(() => {
    hasOnDevice();
  }, []);

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
      flexShrink: 1,
    },
    titleSize: {
      marginLeft: 8,
      flexShrink: 1,
    },
    title: {
      color: theme.text.basic,
    },
    size: { marginTop: 4 },
    regularText: {
      color: theme.text.neutral,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const getIcon = () => {
    switch (fileType) {
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

  const task = ReactNativeBlobUtil.config({
    fileCache: true,
  }).fetch('GET', file.url);

  const getProgress = () => {
    task.progress &&
      task.progress((received, total) => {
        console.log(
          '🚀 ~ file: DownloadItem.tsx:113 ~ .progress ~ total:',
          total
        );
        console.log(
          '🚀 ~ file: DownloadItem.tsx:113 ~ .progress ~ received:',
          received
        );
        console.log('progress ' + Math.floor((received / total) * 100) + '%');
      });
  };

  const handleDownload = () => {
    setIsLoading(true);
    getProgress();
    task
      .then(res => {
        ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: file.name,
            parentFolder: 'Masters',
            mimeType: file.mime,
          },
          'Download',
          res.path()
        );
      })
      .catch(err => {
        console.log(err, 'downloadError');
      })
      .then(() => {
        hasOnDevice();
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err, 'downloadError2');
      });
  };
  const handleDelete = async () => {
    await ReactNativeBlobUtil.fs.unlink(MASTERS_PATH + '/' + title);
    hasOnDevice();
  };
  const handleStop = () => {
    task.cancel(() => {
      setIsLoading(false);
    });
  };

  const getAction = () => {
    if (isLoading) {
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
                {size} Mb
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.action}>{getAction()}</View>
      </View>
      {isLoading ? (
        <ProgressBar progress={10} currentSize={5} size={size} />
      ) : (
        <View style={{ height: 24 }} />
      )}
    </View>
  );
};
