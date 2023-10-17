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
import { useAppDispatch, useAppSelector } from '@/store';
import { setTaskFileOnDevice } from '@/store/slices/tasks/actions';
import { setUserFileOnDevice } from '@/store/slices/user/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import { File } from '@/types/fileManager';

import { FileItem } from './FileItem';

const dirs = ReactNativeBlobUtil.fs.dirs;
const actionByFileType = {
  task: setTaskFileOnDevice,
  user: setUserFileOnDevice,
};

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
  isUploading: boolean;
  fileType: 'user' | 'task';
};

export const DownloadItem = ({
  file,
  onDelete,
  canDelete,
  fileType,
  isUploading,
}: DownloadItemProps) => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [received, setReceived] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] =
    useState<StatefulPromise<FetchBlobResponse>>();

  const onDevice = useAppSelector(state =>
    fileType === 'task' ? state.tasks : state.user,
  ).filesOnDevice?.[file.fileID];

  useEffect(() => {
    if (!onDevice && !canDownload) {
      setIsDeleting(false);
    }
  }, [onDevice]);

  const type = file?.sourceExtension || file.extensionOriginal;
  const title = `${file.name}.${type}`;
  const FILE_PATH = `${dirs.DocumentDir}/${title}`;
  const newFile = ReactNativeBlobUtil.config({
    fileCache: true,
    path: FILE_PATH,
  });
  const canDownload = !!file.url;

  const handleDownload = () => {
    setIsLoading(true);
    const active = newFile.fetch('GET', file.url);
    setActiveTask(active);
    active.progress((rec, total) => {
      setReceived(+rec);
      setProgress(+Math.floor((+rec / +total) * 100));
    });
    active
      .catch(async err => {
        const exist = await ReactNativeBlobUtil.fs.exists(FILE_PATH);

        if (exist) {
          await ReactNativeBlobUtil.fs.unlink(FILE_PATH);
        }

        console.log(
          '🚀 ~ file: DownloadItem.tsx:93 ~ handleDownload ~ err:',
          err,
        );
      })
      .finally(async () => {
        const exist = await ReactNativeBlobUtil.fs.exists(FILE_PATH);
        dispatch(actionByFileType[fileType]({ [file.fileID]: exist }));
        setIsLoading(false);
      });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete({ fileID: file.fileID, filePath: FILE_PATH });
      dispatch(actionByFileType[fileType]({ [file.fileID]: false }));
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
              file.mime,
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
    if (isUploading || isDeleting) {
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
      fileType={type}
      title={title}
      fileDisabled={!onDevice}
      isLoading={isLoading}
      progress={progress}
      received={received}
    />
  );
};
