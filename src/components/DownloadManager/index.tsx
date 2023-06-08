import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { File } from '@/store/api/tasks/types';

import { DownloadItem } from './DownloadItem';

type DownloadManagerProps = {
  files: File[];
};
export const DownloadManager: FC<DownloadManagerProps> = ({ files }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      {files.map(file => {
        return <DownloadItem file={file} key={file.url} />;
      })}
    </View>
  );
};
