import ReactNativeBlobUtil from 'react-native-blob-util';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { store } from '@/store';
import { setTaskFileOnDevice } from '@/store/slices/tasks/actions';
import { setUserFileOnDevice } from '@/store/slices/user/actions';
import { File } from '@/types/fileManager';

const dirs = ReactNativeBlobUtil.fs.dirs;
const { dispatch } = store;

const actionByFileType: Record<
  'user' | 'task',
  ActionCreatorWithPayload<{ [index: number]: boolean }>
> = {
  user: setUserFileOnDevice,
  task: setTaskFileOnDevice,
};

export const saveOnDevice = async (
  files: File[],
  fileType: 'user' | 'task' = 'task',
) => {
  const saveFiles = async (file: File) => {
    const title = `${file.name}.${file.sourceExtension}`;
    const FILE_PATH = `${dirs.DocumentDir}/${title}`;

    const newFile = ReactNativeBlobUtil.config({
      fileCache: true,
      path: FILE_PATH,
    });

    await newFile.fetch('GET', file.url);
    await dispatch(actionByFileType[fileType]({ [file.fileID]: true }));
  };

  await Promise.all(files.map(saveFiles));
};
