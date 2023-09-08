import ReactNativeBlobUtil from 'react-native-blob-util';

import { File } from '@/types/fileManager';

const dirs = ReactNativeBlobUtil.fs.dirs;

export const saveOnDevice = async (files: File[]) => {
  const saveFiles = async (file: File) => {
    const title = `${file.name}.${file.sourceExtension}`;
    const FILE_PATH = `${dirs.DocumentDir}/${title}`;

    const newFile = ReactNativeBlobUtil.config({
      fileCache: true,
      path: FILE_PATH,
    });

    await newFile.fetch('GET', file.url);
  };

  await Promise.all(files.map(saveFiles));
};
