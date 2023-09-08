import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import plural from 'plural-ru';
import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

import { ProgressBar } from '@/components/FileManager/ProgressBar/ProgressBar';
import { Controllers, Progresses } from '@/types/fileManager';

import styles from './styles';

type UploadProgressProps = {
  controllers: Controllers;
  progressesSelector: Progresses;
};

export const UploadProgress = ({
  controllers,
  progressesSelector,
}: UploadProgressProps) => {
  const theme = useTheme();

  const progresses = Object.values(progressesSelector);
  const dates = Object.keys(progressesSelector);

  return (
    <>
      {progresses.map((progress, index) => {
        const date = dates[index] as string;
        return (
          <View key={dates[index]} style={styles.mt24}>
            <View style={styles.rowBetween}>
              <Text variant={'bodyMRegular'} color={theme.text.basic}>
                Загружается{' '}
                {plural(
                  progress.files.length,
                  '%d файл',
                  '%d файла',
                  '%d файлов'
                )}
              </Text>
              <TouchableOpacity onPress={() => controllers?.[date]?.abort()}>
                <Text variant={'bodySBold'} color={theme.text.basic}>
                  Отмена
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mt16}>
              <ProgressBar
                progress={Math.round((progress?.progress || 1) * 100)}
                loaded={progress?.loaded}
                size={progress?.total || 0}
              />
            </View>
            <View
              style={[
                styles.progress,
                {
                  borderColor: theme.stroke.disableDivider,
                },
              ]}
            >
              {progress.files.map((file, index) => (
                <View
                  key={file.name}
                  style={[styles.rowBetween, index !== 0 && { marginTop: 4 }]}
                >
                  <Text
                    variant={'bodySRegular'}
                    numberOfLines={1}
                    style={{ width: '80%' }}
                    color={theme.text.basic}
                  >
                    {file.name}
                  </Text>
                  <Text
                    variant={'bodySRegular'}
                    numberOfLines={1}
                    color={theme.text.neutral}
                  >
                    {prettyBytes(file.size)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </>
  );
};
