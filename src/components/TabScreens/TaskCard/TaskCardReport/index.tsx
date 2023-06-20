import React, { FC, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { NoFilesIcon } from '@/assets/icons/svg/screens/NoFilesIcon';
import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import { ProgressBar } from '@/components/FileManager/ProgressBar';
import { UploadManager } from '@/components/FileManager/UploadManager';
import { usePostTasksFilesMutation } from '@/store/api/tasks';
import { File } from '@/store/api/tasks/types';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { StatusType } from '@/types/task';

import { TaskCardUploadBottomSheet } from '../TaskCardUploadBottomSheet';

import { styles } from './styles';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusID: StatusType | undefined;
  files: File[];
  taskId: string;
  uploadModalVisible: boolean;
  onUploadModalVisible: () => void;
};
const controller = new AbortController();

export const TaskCardReport: FC<TaskCardReportProps> = ({
  activeBudgetCanceled,
  statusID,
  files,
  taskId,
  uploadModalVisible,
  onUploadModalVisible,
}) => {
  const theme = useTheme();
  const [postTasksFiles] = usePostTasksFilesMutation();
  const handleUpload = async ({
    formData,
    files,
  }: {
    formData: FormData;
    files: {
      name: string;
      size: number;
    }[];
  }) => {
    const date = new Date().toISOString();
    const request = postTasksFiles({
      formData,
      files,
      date,
      signal: controller.signal,
    });
    await request.unwrap();
  };
  const progressesSelector = useSelector(selectTasks).progresses;
  const progresses = Object.values(progressesSelector);
  const dates = Object.keys(progressesSelector);
  console.log('🚀 ~ file: index.tsx:33 ~ dates:', dates);
  console.log('🚀 ~ file: index.tsx:31 ~ progresses:', progresses);
  const getContent = () => {
    switch (statusID) {
      case StatusType.ACTIVE:
        return (
          <View style={styles.container}>
            <View
              style={[
                styles.otes,
                { backgroundColor: theme.background.fieldMain },
              ]}
            >
              <OtesIcon />
            </View>
            <Text variant="title2" style={styles.mt24} color={theme.text.basic}>
              {activeBudgetCanceled
                ? 'Отчет  недоступен'
                : 'Отчет пока недоступен'}
            </Text>
            <Text
              variant="bodySRegular"
              style={styles.description}
              color={theme.text.neutral}
            >
              {activeBudgetCanceled
                ? 'Отправка файлов доступна только назначенным исполнителям'
                : 'Вы сможете отправлять файлы для подтверждения выполненных услуг в случае назначения вас исполнителем'}
            </Text>
          </View>
        );
      case StatusType.WORK:
      case StatusType.SUMMARIZING:
      case StatusType.COMPLETED:
      case StatusType.PAID:
        return (
          <View style={styles.mt36}>
            <Text variant="title3" color={theme.text.basic}>
              Загруженные файлы
            </Text>
            <View style={styles.mt24}>
              {files.length ? (
                <>
                  <UploadManager files={files} taskId={taskId} />
                  {progresses.map((progress, index) => {
                    if (progress.progress === 1) {
                      return null;
                    }
                    return (
                      <View key={dates[index]} style={{ marginTop: 24 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text variant={'bodyMRegular'}>
                            Загружается {progress.files.length} файла
                          </Text>
                          <TouchableOpacity>
                            <Text
                              variant={'bodySBold'}
                              onPress={() => controller.abort()}
                            >
                              Отмена
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                          <ProgressBar
                            progress={Math.round(
                              (progress?.progress || 1) * 100
                            )}
                            loaded={progress?.loaded}
                            size={progress?.total || 0}
                          />
                        </View>
                        <View
                          style={{
                            marginTop: 16,
                            borderLeftWidth: 2,
                            paddingLeft: 12,
                            borderColor: theme.stroke.disableDivider,
                          }}
                        >
                          {progress.files.map((file, index) => (
                            <View
                              key={file.name}
                              style={[
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                },
                                index !== 0 && { marginTop: 4 },
                              ]}
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
                  <View style={styles.mt36}></View>
                  <Text variant="title3" color={theme.text.basic}>
                    Закрывающие документы
                  </Text>
                  <Text
                    variant="bodySRegular"
                    style={styles.mt8}
                    color={theme.text.neutral}
                  >
                    Пока здесь ничего нет
                  </Text>
                </>
              ) : (
                <View style={styles.download}>
                  <DownloadFilesIcon />
                  <Text
                    variant="bodySRegular"
                    style={styles.desc}
                    color={theme.text.neutral}
                  >
                    Загрузите файлы, подтверждающие выполнение услуг общим
                    размером не более 50 МВ
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      default:
        return (
          <>
            {files.length ? (
              <View style={styles.mt36}>
                <Text variant="title3" color={theme.text.basic}>
                  Загруженные файлы
                </Text>
                <View style={styles.mt24}>
                  <UploadManager files={files} taskId={taskId} />

                  <View style={styles.mt36}></View>
                  <Text variant="title3" color={theme.text.basic}>
                    Закрывающие документы
                  </Text>
                  <Text
                    variant="bodySRegular"
                    style={styles.mt8}
                    color={theme.text.neutral}
                  >
                    Пока здесь ничего нет
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <View
                  style={[
                    styles.otes,
                    { backgroundColor: theme.background.fieldMain },
                  ]}
                >
                  <NoFilesIcon />
                </View>
                <Text
                  variant="title2"
                  style={styles.mt24}
                  color={theme.text.basic}
                >
                  Файлов нет
                </Text>
              </View>
            )}
          </>
        );
    }
  };
  return (
    <>
      <TaskCardUploadBottomSheet
        isVisible={uploadModalVisible}
        onClose={onUploadModalVisible}
        taskId={taskId}
        handleUpload={handleUpload}
      />
      {getContent()}
    </>
  );
};
