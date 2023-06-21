import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import plural from 'plural-ru';
import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

import { selectTasks } from '@/store/slices/tasks/selectors';
import { StatusType } from '@/types/task';

import { controllers } from '../TabScreens/TaskCard/TaskCardReport';
import { ProgressBar } from './ProgressBar';

type UploadProgressProps = {
  statusID: StatusType | undefined;
};
export const UploadProgress: FC<UploadProgressProps> = ({ statusID }) => {
  const theme = useTheme();
  const progressesSelector = useSelector(selectTasks).progresses;

  const canDelete =
    statusID && [StatusType.SUMMARIZING, StatusType.WORK].includes(statusID);
  const progresses = Object.values(progressesSelector);
  const dates = Object.keys(progressesSelector);

  const styles = StyleSheet.create({
    mt24: {
      marginTop: 24,
    },
    mt16: {
      marginTop: 16,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progress: {
      marginTop: 16,
      borderLeftWidth: 2,
      paddingLeft: 12,
    },
  });
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
              {canDelete && (
                <TouchableOpacity onPress={() => controllers?.[date]?.abort()}>
                  <Text variant={'bodySBold'} color={theme.text.basic}>
                    Отмена
                  </Text>
                </TouchableOpacity>
              )}
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
