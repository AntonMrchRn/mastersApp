import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { File } from '@/store/api/tasks/types';
import { StatusType } from '@/types/task';

import { UploadItem } from './UploadItem';

type UploadManagerProps = {
  files: File[];
  taskId: string;
  statusID: StatusType | undefined;
};
export const UploadManager: FC<UploadManagerProps> = ({
  files,
  taskId,
  statusID,
}) => {
  const canDelete =
    statusID && [StatusType.SUMMARIZING, StatusType.WORK].includes(statusID);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      {files.map((file, index) => {
        return (
          <View style={[index !== 0 && { marginTop: 8 }]} key={file.url}>
            <UploadItem file={file} taskId={taskId} canDelete={canDelete} />
          </View>
        );
      })}
    </View>
  );
};
