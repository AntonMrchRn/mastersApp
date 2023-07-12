import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from 'react-native-blob-util';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';
import { configApp, hitSlop } from '@/constants/platform';
import { useDeleteFileMutation } from '@/store/api/user';
import { File } from '@/types/fileManager';

import { FileItem } from './FileItem';

type DownloadItemProps = {
  file: File;
  isUserFiles: boolean;
};

export const DownloadItem = ({ file, isUserFiles }: DownloadItemProps) => {
  const [deleteFile, { isSuccess }] = useDeleteFileMutation();

  const [onDevice, setOnDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [received, setReceived] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] =
    useState<StatefulPromise<FetchBlobResponse>>();

  useEffect(() => {
    if (isSuccess && !onDevice && !canDownload) {
      setIsDeleting(false);
    }
  }, [isSuccess, onDevice]);

  useEffect(() => {
    hasOnDevice();
  }, []);

  const dirs = ReactNativeBlobUtil.fs.dirs;
  const fileType = file?.extensionOriginal || '';

  const title = `${file.name}.${fileType}`;
  const FILE_PATH = `${dirs.DocumentDir}/${title}`;
  const newFile = ReactNativeBlobUtil.config({
    fileCache: true,
    path: FILE_PATH,
  });
  const canDownload = !!file.url;

  const hasOnDevice = async () => {
    try {
      const FILE_PATH = `${dirs.DocumentDir}/${title}`;
      const exist = await ReactNativeBlobUtil.fs.exists(FILE_PATH);
      setOnDevice(exist);
    } catch (e) {
      console.log('hasOnDevice error: ', e);
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    const active = newFile.fetch('GET', file.url);
    setActiveTask(active);
    active.progress((rec, total) => {
      setReceived(+rec);
      setProgress(+Math.floor((rec / total) * 100));
    });
    active
      .catch(err => {
        console.log(
          '🚀 ~ file: DownloadItem.tsx:75 ~ handleDownload ~ err:',
          err
        );
      })
      .finally(() => {
        hasOnDevice();
        setIsLoading(false);
      });
  };

  const handleDelete = async () => {
    try {
      if (isUserFiles) {
        setIsDeleting(true);
        await deleteFile(file.fileID).unwrap();
      }
      await ReactNativeBlobUtil.fs.unlink(FILE_PATH);
      await hasOnDevice();
    } catch (err) {
      if (isUserFiles) {
        setIsDeleting(false);
      }
      console.log('🚀 ~ file: DownloadItem.tsx:97 ~ handleDelete ~ err:', err);
    }
  };

  const handleStop = () => {
    activeTask &&
      activeTask.cancel(() => {
        setReceived(0);
        setProgress(0);
        setIsLoading(false);
        setActiveTask(undefined);
      });
  };

  const handleOpen = async () => {
    try {
      if (onDevice) {
        configApp.ios
          ? await ReactNativeBlobUtil.ios.openDocument(FILE_PATH)
          : await ReactNativeBlobUtil.android.actionViewIntent(
              FILE_PATH,
              file.mime
            );
      }
    } catch (e) {
      console.log('handleOpen error: ', e);
    }
  };

  const getAction = () => {
    if (isLoading) {
      return (
        <TouchableOpacity onPress={handleStop} hitSlop={hitSlop}>
          <CloseFileIcon />
        </TouchableOpacity>
      );
    }
    if (isDeleting) {
      return <ActivityIndicator />;
    }
    if (onDevice) {
      return (
        <TouchableOpacity onPress={handleDelete} hitSlop={hitSlop}>
          <DeleteFileIcon />
        </TouchableOpacity>
      );
    }
    if (canDownload) {
      return (
        <TouchableOpacity onPress={handleDownload} hitSlop={hitSlop}>
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
      received={received}
    />
  );
};
