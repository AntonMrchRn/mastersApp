import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { store } from '@/store';
import { setTaskFilesOnDevice } from '@/store/slices/tasks/actions';
import { setUserFilesOnDevice } from '@/store/slices/user/actions';
import { File } from '@/types/fileManager';
import { hasOnDevice } from '@/utils/fileManager/hasOnDevice';

const { dispatch } = store;

const actionByFileType: Record<
  'user' | 'task',
  ActionCreatorWithPayload<{ [index: number]: boolean }>
> = {
  user: setUserFilesOnDevice,
  task: setTaskFilesOnDevice,
};

export const checkFilesOnDevice = async (
  files: File[],
  fileType: 'task' | 'user' = 'task'
) => {
  const filesOnDevice = await Promise.all(files.map(hasOnDevice)).then(res =>
    res.reduce(
      (total, file) => ({
        ...total,
        [file.fileID]: file.onDevice,
      }),
      {} as { [index: number]: boolean }
    )
  );
  dispatch(actionByFileType[fileType](filesOnDevice));
};
