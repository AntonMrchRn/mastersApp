import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from 'react-native-blob-util';

import { Text, useTheme } from 'rn-ui-kit';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DOCIcon } from '@/assets/icons/svg/files/DOCIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';
import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { JPGIcon } from '@/assets/icons/svg/files/JPGIcon';
import { MP4Icon } from '@/assets/icons/svg/files/MP4Icon';
import { PDFIcon } from '@/assets/icons/svg/files/PDFIcon';
import { PNGIcon } from '@/assets/icons/svg/files/PNGIcon';
import { PPTIcon } from '@/assets/icons/svg/files/PPTIcon';
import { WEBPIcon } from '@/assets/icons/svg/files/WEBPIcon';
import { XLSIcon } from '@/assets/icons/svg/files/XLSIcon';
import { ZIPIcon } from '@/assets/icons/svg/files/ZIPIcon';
import { configApp } from '@/constants/platform';
import { File } from '@/store/api/tasks/types';

import { ProgressBar } from './ProgressBar';

type DownloadItemProps = {
  file: File;
};
export const DownloadItem: FC<DownloadItemProps> = ({ file }) => {
  const [onDevice, setOnDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recieved, setRecieved] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] =
    useState<StatefulPromise<FetchBlobResponse>>();

  const theme = useTheme();

  const dirs = ReactNativeBlobUtil.fs.dirs;
  const fileType = file?.extensionOriginal || '';
  const title = `${file.name}.${fileType}`;
  const FILE_PATH = `${dirs.DocumentDir}/${title}`;
  const task = ReactNativeBlobUtil.config({
    fileCache: true,
    path: FILE_PATH,
  });
  const canDownload = !!file.url;

  const hasOnDevice = () => {
    ReactNativeBlobUtil.fs.exists(FILE_PATH).then(exists => {
      setOnDevice(exists);
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
      flexGrow: 1,
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
      case 'webp':
        return <WEBPIcon color={theme.icons.accent} />;
      case 'mp4':
        return <MP4Icon color={theme.icons.accent} />;
      default:
        return <FileIcon color={theme.icons.accent} />;
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    const active = task.fetch('GET', file.url);
    setActiveTask(active);
    active.progress((rec, total) => {
      setRecieved(+rec);
      setProgress(+Math.floor((rec / total) * 100));
    });
    active
      .catch(err => {
        console.log(
          '🚀 ~ file: DownloadItem.tsx:149 ~ handleDownload ~ err:',
          err
        );
      })
      .finally(() => {
        hasOnDevice();
        setIsLoading(false);
      });
  };
  const handleDelete = async () => {
    await ReactNativeBlobUtil.fs.unlink(FILE_PATH);
    hasOnDevice();
  };

  const handleStop = () => {
    activeTask &&
      activeTask.cancel(() => {
        setRecieved(0);
        setProgress(0);
        setIsLoading(false);
        setActiveTask(undefined);
      });
  };

  const handleOpen = () => {
    if (onDevice) {
      configApp.ios
        ? ReactNativeBlobUtil.ios.openDocument(FILE_PATH)
        : ReactNativeBlobUtil.android.actionViewIntent(FILE_PATH, file.mime);
    }
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
        <TouchableOpacity
          style={styles.iconTitleSize}
          onPress={handleOpen}
          disabled={!onDevice}
        >
          <View style={styles.iconContainer}>{getIcon()}</View>
          <View style={styles.titleSize}>
            <Text variant={'bodySBold'} style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.size}>
              <Text variant={'captionRegular'} style={styles.regularText}>
                {file.size} Mb
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.action}>{getAction()}</View>
      </View>
      {isLoading && (
        <ProgressBar progress={progress} recieved={recieved} size={file.size} />
      )}
    </View>
  );
};
