import ReactNativeBlobUtil from 'react-native-blob-util';

import { File } from '@/types/fileManager';

const dirs = ReactNativeBlobUtil.fs.dirs;

export const saveOnDevice = (files: File[]) => {
  files.forEach(file => {
    const title = `${file.name}.${file.extensionOriginal}`;
    const FILE_PATH = `${dirs.DocumentDir}/${title}`;
    const newFile = ReactNativeBlobUtil.config({
      fileCache: true,
      path: FILE_PATH,
    });
    newFile.fetch('GET', file.url);
  });
};
