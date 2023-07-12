import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { File } from '@/types/fileManager';

import { DownloadItem } from './DownloadItem';

type DownloadManagerProps = {
  files: File[];
  isUserFiles?: boolean;
};

export const DownloadManager: FC<DownloadManagerProps> = ({
  files,
  isUserFiles = false,
}) => (
  <View style={styles.container}>
    {files.map((file, index) => {
      return (
        <View style={[index !== 0 && styles.mt8]} key={file.url}>
          <DownloadItem key={file.url} file={file} isUserFiles={isUserFiles} />
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mt8: {
    marginTop: 8,
  },
});
