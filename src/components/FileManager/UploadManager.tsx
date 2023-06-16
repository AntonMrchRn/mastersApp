import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { File } from '@/store/api/tasks/types';

import { UploadItem } from './UploadItem';

type UploadManagerProps = {
  files: File[];
  taskId: string;
};
export const UploadManager: FC<UploadManagerProps> = ({ files, taskId }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      {files.map(file => {
        return <UploadItem file={file} key={file.url} taskId={taskId} />;
      })}
    </View>
  );
};
