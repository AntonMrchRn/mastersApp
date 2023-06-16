import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from 'react-native-blob-util';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';
import { configApp } from '@/constants/platform';
import { File } from '@/store/api/tasks/types';

import { FileItem } from './FileItem';

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
    <FileItem
      action={getAction()}
      fileOpen={handleOpen}
      sizeBytes={file.sizeBytes}
      fileType={fileType}
      title={title}
      fileDisabled={!onDevice}
      isLoading={isLoading}
      progress={progress}
      recieved={recieved}
    />
  );
};
