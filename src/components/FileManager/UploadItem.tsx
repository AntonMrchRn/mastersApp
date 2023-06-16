import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import {
  useDeleteTasksFilesMutation,
  useGetTaskQuery,
} from '@/store/api/tasks';
import { File } from '@/store/api/tasks/types';

import { FileItem } from './FileItem';

type UploadItemProps = {
  taskId: string;
  file: File;
};
export const UploadItem: FC<UploadItemProps> = ({ file, taskId }) => {
  const getTask = useGetTaskQuery(taskId);

  const [deleteTasksFiles] = useDeleteTasksFilesMutation();

  const fileType = file?.extensionOriginal || '';
  const title = `${file.name}.${fileType}`;

  const handleDelete = async () => {
    try {
      await deleteTasksFiles(file.fileID.toString()).unwrap();
      getTask.refetch();
    } catch (err) {
      console.log('🚀 ~ file: UploadItem.tsx:29 ~ handleDelete ~ err:', err);
    }
  };

  const getAction = () => {
    return (
      <TouchableOpacity onPress={handleDelete}>
        <DeleteFileIcon />
      </TouchableOpacity>
    );
  };

  return (
    <FileItem
      action={getAction()}
      sizeBytes={file.sizeBytes}
      fileType={fileType}
      title={title}
      fileDisabled
      isLoading={false}
    />
  );
};
