import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from 'react-native-blob-util';

import { useToast } from 'rn-ui-kit';

import { CloseFileIcon } from '@/assets/icons/svg/files/CloseFileIcon';
import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { DownloadFileIcon } from '@/assets/icons/svg/files/DownloadFileIcon';
import { configApp, hitSlop } from '@/constants/platform';
import { AxiosQueryErrorResponse } from '@/types/error';
import { File } from '@/types/fileManager';

import { FileItem } from './FileItem';

type DownloadItemProps = {
  file: File;
  onDelete: ({
    fileID,
    filePath,
  }: {
    fileID?: number;
    filePath?: string;
  }) => Promise<void>;
  canDelete: boolean;
};

export const DownloadItem = ({
  file,
  onDelete,
  canDelete,
}: DownloadItemProps) => {
  const [onDevice, setOnDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [received, setReceived] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] =
    useState<StatefulPromise<FetchBlobResponse>>();

  const toast = useToast();

  useEffect(() => {
    if (!onDevice && !canDownload) {
      setIsDeleting(false);
    }
  }, [onDevice]);

  useEffect(() => {
    hasOnDevice();
  }, []);

  const dirs = ReactNativeBlobUtil.fs.dirs;
  const fileType = file?.sourceExtension || '';

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
      setProgress(+Math.floor((+rec / +total) * 100));
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
      setIsDeleting(true);
      await onDelete({ fileID: file.fileID, filePath: FILE_PATH });
      setIsDeleting(false);
      await hasOnDevice();
    } catch (err) {
      setIsDeleting(false);
      toast.show({
        type: 'error',
        title: (err as AxiosQueryErrorResponse).data.message,
      });
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
    if (onDevice && canDelete) {
      return (
        <TouchableOpacity onPress={handleDelete} hitSlop={hitSlop}>
          <DeleteFileIcon />
        </TouchableOpacity>
      );
    }
    if (canDownload && !onDevice) {
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
