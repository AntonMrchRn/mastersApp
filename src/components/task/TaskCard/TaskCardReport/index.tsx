import React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { UploadBottomSheet } from '@/components/FileManager/UploadBottomSheet';
import { UploadProgress } from '@/components/FileManager/UploadProgress';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { useAppSelector } from '@/store';
import {
  useDeleteTasksFilesMutation,
  useGetTaskQuery,
  usePostTasksFilesMutation,
} from '@/store/api/tasks';
import { deleteProgress } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { Controllers, File, HandleUpload } from '@/types/fileManager';
import { StatusType, TaskType } from '@/types/task';
import { getFormData } from '@/utils/fileManager/getFormData';
import { saveOnDevice } from '@/utils/fileManager/saveOnDevice';

import { styles } from './styles';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusID: StatusType | undefined;
  reportFiles: File[];
  closureFiles: File[];
  taskId: string;
  subsetID: TaskType | undefined;
  isCurator: boolean;
  uploadModalVisible: boolean;
  onUploadModalVisible: () => void;
  toClose: boolean | undefined;
  uploadLimitBannerVisible: boolean;
  onUploadLimitBannerVisible: () => void;
};

export let controllers: Controllers = {};
export const TaskCardReport = ({
  activeBudgetCanceled,
  statusID,
  reportFiles,
  closureFiles,
  taskId,
  subsetID,
  isCurator,
  uploadModalVisible,
  onUploadModalVisible,
  toClose,
  onUploadLimitBannerVisible,
  uploadLimitBannerVisible,
}: TaskCardReportProps) => {
  const theme = useTheme();
  const getTask = useGetTaskQuery(taskId);

  const [postTasksFiles] = usePostTasksFilesMutation();
  const [deleteTasksFiles] = useDeleteTasksFilesMutation();

  const progressesSelector = useAppSelector(selectTasks).progresses;
  const canDelete =
    statusID &&
    ([StatusType.SUMMARIZING, StatusType.WORK].includes(statusID) || toClose);

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

  const onDelete = async ({ fileID }: { fileID?: number }) => {
    fileID && (await deleteTasksFiles(fileID.toString()).unwrap());
    getTask.refetch();
  };

  const onBanner = () => {
    !uploadLimitBannerVisible && onUploadLimitBannerVisible();
  };

  const UploadedFiles = (
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
                Загрузите файлы, подтверждающие выполнение услуг общим размером
                не более 250 МВ
              </Text>
            </View>
          </>
        )}
        <UploadProgress
          controllers={controllers}
          progressesSelector={progressesSelector}
        />
      </View>
    </View>
  );

  const DefaultUploadFiles = (
    <>
      {reportFiles.length || closureFiles.length ? (
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
              </>
            ) : (
              <Text
                variant="bodySRegular"
                style={styles.mt8}
                color={theme.text.neutral}
              >
                Пока здесь ничего нет
              </Text>
            )}
          </View>
        </View>
      ) : (
        <PreviewNotFound type={PreviewNotFoundType.NoFiles} />
      )}
    </>
  );

  const AllUploadFiles = () => {
    return (
      <View style={styles.mt36}>
        <Text variant="title3" color={theme.text.basic}>
          Загруженные файлы
        </Text>
        {reportFiles.length ? (
          <View style={styles.mt24}>
            <DownloadManager
              files={reportFiles}
              onDelete={onDelete}
              canDelete={false}
            />
          </View>
        ) : (
          <Text
            variant="bodySRegular"
            style={styles.mt8}
            color={theme.text.neutral}
          >
            {statusID === StatusType.WORK
              ? 'Загрузите чеки или иные финансовые документы общим размером не более 250 МВ'
              : 'Файлов нет'}
          </Text>
        )}
        <View style={styles.mt36}>
          <Text variant="title3" color={theme.text.basic}>
            Закрывающие документы
          </Text>
          <View style={styles.mt24}>
            {closureFiles.length ? (
              <>
                <DownloadManager
                  files={closureFiles}
                  onDelete={onDelete}
                  canDelete={canDelete}
                />
                <UploadProgress
                  controllers={controllers}
                  progressesSelector={progressesSelector}
                />
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
                    {statusID !== StatusType.WORK
                      ? 'Загрузите чеки или иные финансовые документы общим размером не более 250 МВ'
                      : 'Файлов нет'}
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
      </View>
    );
  };

  const getContent = () => {
    //к закрытию
    //необходимо отправить закрывающие документы
    if (toClose) {
      return <AllUploadFiles />;
    }
    switch (statusID) {
      case StatusType.ACTIVE:
        return (
          <PreviewNotFound
            type={
              activeBudgetCanceled
                ? PreviewNotFoundType.ReportNotAvailable
                : PreviewNotFoundType.ReportNotYetAvailable
            }
          />
        );
      case StatusType.SUMMARIZING:
        if (subsetID === TaskType.IT_FIRST_RESPONSE && isCurator) {
          return DefaultUploadFiles;
        }
        return UploadedFiles;
      case StatusType.WORK:
      case StatusType.COMPLETED:
      case StatusType.PAID:
        return <AllUploadFiles />;
      default:
        return DefaultUploadFiles;
    }
  };
  return (
    <>
      <UploadBottomSheet
        onBanner={onBanner}
        handleUpload={handleUpload}
        isVisible={uploadModalVisible}
        formData={getFormData({ taskId, toClose, statusID })}
        onClose={onUploadModalVisible}
        deleteProgress={deleteProgress}
      />
      {getContent()}
    </>
  );
};
