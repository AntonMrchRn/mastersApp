import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { Banner, Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { NoFilesIcon } from '@/assets/icons/svg/screens/NoFilesIcon';
import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { UploadBottomSheet } from '@/components/FileManager/UploadBottomSheet';
import { UploadProgress } from '@/components/FileManager/UploadProgress';
import { useAppSelector } from '@/store';
import {
  useDeleteTasksFilesMutation,
  useGetTaskQuery,
  usePostTasksFilesMutation,
} from '@/store/api/tasks';
import { deleteProgress } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { Controllers, File, HandleUpload } from '@/types/fileManager';
import { StatusType } from '@/types/task';
import { getFormData } from '@/utils/fileManager/getFormData';
import { saveOnDevice } from '@/utils/fileManager/saveOnDevice';

import { styles } from './styles';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusID: StatusType | undefined;
  files: File[];
  taskId: string;
  uploadModalVisible: boolean;
  onUploadModalVisible: () => void;
};

export let controllers: Controllers = {};
export const TaskCardReport: FC<TaskCardReportProps> = ({
  activeBudgetCanceled,
  statusID,
  files,
  taskId,
  uploadModalVisible,
  onUploadModalVisible,
}) => {
  const theme = useTheme();
  const [banner, setBanner] = useState(false);
  const getTask = useGetTaskQuery(taskId);

  const onBanner = () => setBanner(!banner);
  const [postTasksFiles] = usePostTasksFilesMutation();
  const [deleteTasksFiles] = useDeleteTasksFilesMutation();

  const progressesSelector = useAppSelector(selectTasks).progresses;
  const canDelete =
    statusID && [StatusType.SUMMARIZING, StatusType.WORK].includes(statusID);
  const handleUpload = async ({
    formData,
    files,
    date,
    names,
  }: HandleUpload) => {
    const controller = new AbortController();
    controllers = { ...controllers, [date]: controller };

    const request = await postTasksFiles({
      formData,
      files,
      date,
      signal: controller.signal,
    }).unwrap();
    const addedFiles = request.filter(file => names.includes(file.name));
    saveOnDevice(addedFiles);
  };
  const reportFiles = files.filter(file => file.isOffer);

  const onDelete = async ({ fileID }: { fileID?: number }) => {
    fileID && (await deleteTasksFiles(fileID.toString()).unwrap());
    getTask.refetch();
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
              {reportFiles.length ? (
                <>
                  <DownloadManager
                    files={reportFiles}
                    onDelete={onDelete}
                    canDelete={canDelete}
                  />
                  <UploadProgress
                    controllers={controllers}
                    progressesSelector={progressesSelector}
                  />
                  <View style={styles.mt36} />
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
                <>
                  <View style={styles.download}>
                    <DownloadFilesIcon />
                    <Text
                      variant="bodySRegular"
                      style={styles.desc}
                      color={theme.text.neutral}
                    >
                      Загрузите файлы, подтверждающие выполнение услуг общим
                      размером не более 250 МВ
                    </Text>
                  </View>
                  <UploadProgress
                    controllers={controllers}
                    progressesSelector={progressesSelector}
                  />
                </>
              )}
            </View>
          </View>
        );
      default:
        return (
          <>
            {reportFiles.length ? (
              <View style={styles.mt36}>
                <Text variant="title3" color={theme.text.basic}>
                  Загруженные файлы
                </Text>
                <View style={styles.mt24}>
                  <DownloadManager
                    files={reportFiles}
                    onDelete={onDelete}
                    canDelete={canDelete}
                  />
                  <UploadProgress
                    controllers={controllers}
                    progressesSelector={progressesSelector}
                  />
                  <View style={styles.mt36} />
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
      <UploadBottomSheet
        onBanner={onBanner}
        handleUpload={handleUpload}
        isVisible={uploadModalVisible}
        formData={getFormData(taskId)}
        onClose={onUploadModalVisible}
        deleteProgress={deleteProgress}
      />
      {banner && (
        <Banner
          onClosePress={onBanner}
          containerStyle={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            bottom: 170,
          }}
          type={'error'}
          icon={'alert'}
          title="Превышен лимит загрузки"
          text={
            'Максимальный размер загружаемого файла:\n ● изображения до 20 МБ форматов jpg, jpeg, png, webp\n ● видео до 50 МБ\nОбщий размер загружаемых файлов не более 250 МВ'
          }
        />
      )}
      {getContent()}
    </>
  );
};
