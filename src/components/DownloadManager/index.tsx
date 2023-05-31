import React, { FC } from 'react';
import { View } from 'react-native';

import { DownloadItem } from './DownloadItem';

import { styles } from './styles';

export type FileProps = {
  url: string;
  name: string;
  fileID: number;
  userID: number;
  isCheck: boolean;
  isOffer: boolean;
  extension: string;
  isApplication: boolean;
};

type DownloadManagerProps = {
  files: FileProps[];
};
export const DownloadManager: FC<DownloadManagerProps> = ({ files }) => {
  return (
    <View style={styles.container}>
      {files.map(file => {
        return <DownloadItem file={file} key={file.url} />;
      })}
    </View>
  );
};
