import { Dispatch, SetStateAction } from 'react';

import { File } from '@/types/fileManager';
import { saveOnDevice } from '@/utils/fileManager/saveOnDevice';

export const saveFiles = async (
  files: File[],
  setUploadedFileIDs: Dispatch<SetStateAction<number[]>>,
  fileType: 'user' | 'task' = 'task',
) => {
  setUploadedFileIDs(prevState => [
    ...prevState,
    ...files.map(file => file.fileID),
  ]);
  await saveOnDevice(files, fileType);
  setUploadedFileIDs([]);
};
