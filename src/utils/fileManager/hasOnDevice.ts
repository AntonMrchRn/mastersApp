import ReactNativeBlobUtil from 'react-native-blob-util';

import { File } from '@/types/fileManager';

const dirs = ReactNativeBlobUtil.fs.dirs;

export const hasOnDevice = async (file: File) => {
  const fileType = file?.sourceExtension || '';
  const title = `${file.name}.${fileType}`;
  const FILE_PATH = `${dirs.DocumentDir}/${title}`;
  const exist = await ReactNativeBlobUtil.fs.exists(FILE_PATH);

  return {
    fileID: file.fileID,
    onDevice: exist,
  };
};
