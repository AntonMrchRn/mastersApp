import React, { FC } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { NoFilesIcon } from '@/assets/icons/svg/screens/NoFilesIcon';
import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import { UploadManager } from '@/components/FileManager/UploadManager';
import { UploadProgress } from '@/components/FileManager/UploadProgress';
import { usePostTasksFilesMutation } from '@/store/api/tasks';
import { File } from '@/store/api/tasks/types';
import { HandleUpload, StatusType } from '@/types/task';

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

export let controllers: { [x: string]: AbortController } = {};
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
  const handleUpload = async ({ formData, files, date }: HandleUpload) => {
    const controller = new AbortController();
    const request = postTasksFiles({
      formData,
      files,
      date,
      signal: controller.signal,
    });
    controllers = { ...controllers, [date]: controller };
    await request.unwrap();
  };
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
                  <UploadManager
                    files={files}
                    taskId={taskId}
                    statusID={statusID}
                  />
                  <UploadProgress />
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
                  <UploadManager
                    files={files}
                    taskId={taskId}
                    statusID={statusID}
                  />
                  <UploadProgress />
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
