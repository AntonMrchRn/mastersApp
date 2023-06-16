import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import { File } from '@/store/api/tasks/types';

import { FileItem } from './FileItem';

type UploadItemProps = {
  file: File;
};
export const UploadItem: FC<UploadItemProps> = ({ file }) => {
  const fileType = file?.extensionOriginal || '';
  const title = `${file.name}.${fileType}`;

  const handleDelete = async () => {
    //
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
