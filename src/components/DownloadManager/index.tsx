import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { DownloadItem } from './DownloadItem';

export type FileProps = {
  url: string;
  name: string;
  fileID: number;
  userID: number;
  isCheck: boolean;
  isOffer: boolean;
  mime: string;
  extension: string;
  extensionOriginal: string;
  isApplication: boolean;
};

type DownloadManagerProps = {
  files: FileProps[];
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
