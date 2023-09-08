import React, { FC } from 'react';
import { View } from 'react-native';

import { File } from '@/types/fileManager';

import { DownloadItem } from '../DownloadItem';

import styles from './styles';

type DownloadManagerProps = {
  files: File[];
  onDelete: ({
    fileID,
    filePath,
  }: {
    fileID?: number;
    filePath?: string;
  }) => Promise<void>;
  canDelete?: boolean;
  uploadedFileIDs?: number[];
};

export const DownloadManager: FC<DownloadManagerProps> = ({
  files,
  onDelete,
  canDelete = true,
  uploadedFileIDs = [],
}) => (
  <View style={styles.container}>
    {files.map((file, index) => (
      <View style={[index !== 0 && styles.mt8]} key={file.fileID}>
        <DownloadItem
          file={file}
          key={file.url}
          onDelete={onDelete}
          canDelete={canDelete}
          isUploading={uploadedFileIDs.includes(file.fileID)}
        />
      </View>
    ))}
  </View>
);
