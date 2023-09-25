import React from 'react';
import { View } from 'react-native';

import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { File } from '@/types/fileManager';
import { RoleType } from '@/types/task';

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
  fileType?: 'user' | 'task';
};

export const DownloadManager = ({
  files,
  onDelete,
  canDelete = true,
  fileType = 'task',
}: DownloadManagerProps) => {
  const userID = useAppSelector(selectAuth).user?.userID;
  const userRoleId = useAppSelector(selectAuth).user?.roleID;

  return (
    <View style={styles.container}>
      {files.map((file, index) => {
        // исполнители могут удалять только свои файлы
        // акты удалять нельзя
        const isAvailableForDeletion =
          (userID === file.userID ||
            userRoleId === RoleType.COORDINATOR ||
            userRoleId === RoleType.SUPERVISOR) &&
          canDelete &&
          !file?.isAct;

        return (
          <View style={[index !== 0 && styles.mt8]} key={file.fileID}>
            <DownloadItem
              file={file}
              fileType={fileType}
              onDelete={onDelete}
              canDelete={isAvailableForDeletion}
            />
          </View>
        );
      })}
    </View>
  );
};
