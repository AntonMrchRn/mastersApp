import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { UploadProgress } from '@/components/FileManager/UploadProgress';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { useAppSelector } from '@/store';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { File } from '@/types/fileManager';
import { StatusType } from '@/types/task';

import { controllers } from '.';

import { styles } from './styles';

type ContentProps = {
  reportFiles: File[];
  onDelete: ({ fileID }: { fileID?: number | undefined }) => Promise<void>;
  uploadedFileIDs: number[];
  closureFiles: File[];
  toClose: boolean | undefined;
  statusID: StatusType | undefined;
  isCurator: boolean;
  isContractor: boolean;
  isInternalExecutor: boolean;
};
export const Content: FC<ContentProps> = ({
  reportFiles,
  onDelete,
  uploadedFileIDs,
  closureFiles,
  toClose,
  statusID,
  isCurator,
  isContractor,
  isInternalExecutor,
}) => {
  const theme = useTheme();
  const progressesSelector = useAppSelector(selectTasks).progresses;
  const canDelete =
    !statusID ||
    ![
      StatusType.CANCELLED_BY_CUSTOMER,
      StatusType.CANCELLED_BY_EXECUTOR,
      StatusType.CLOSED,
    ].includes(statusID);

  //* если нет загруженных файлов
  //* и нет закрывающих документов
  //* и статус не К закрытию
  //* и если пользователь куратор или если статус Закрыто, Отменено исполнителем или Отменено заказчиком
  //* показываем что файлов нет
  if (
    !reportFiles.length &&
    !closureFiles.length &&
    !toClose &&
    (isCurator ||
      (statusID &&
        [
          StatusType.CLOSED,
          StatusType.CANCELLED_BY_EXECUTOR,
          StatusType.CANCELLED_BY_CUSTOMER,
        ].includes(statusID)))
  ) {
    return <PreviewNotFound type={PreviewNotFoundType.NoFiles} />;
  }
  return (
    <View>
      <Text variant="title3" color={theme.text.basic}>
        Загруженные файлы
      </Text>
      {reportFiles.length ? (
        <View style={styles.mt24}>
          <DownloadManager
            files={reportFiles}
            onDelete={onDelete}
            canDelete={canDelete}
            uploadedFileIDs={uploadedFileIDs}
          />
          {statusID &&
            [StatusType.WORK, StatusType.SUMMARIZING].includes(statusID) && (
              <UploadProgress
                controllers={controllers}
                progressesSelector={progressesSelector}
              />
            )}
        </View>
      ) : (
        <>
          {statusID &&
          [
            StatusType.WORK,
            StatusType.SUMMARIZING,
            StatusType.MATCHING,
            StatusType.RETURNED,
          ].includes(statusID) &&
          !toClose &&
          !isCurator ? (
            <>
              <Spacer size="xl" />
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
            </>
          ) : (
            <Text
              variant="bodySRegular"
              color={theme.text.neutral}
              style={styles.mt8}
            >
              Файлов нет
            </Text>
          )}
          {statusID &&
            [
              StatusType.WORK,
              StatusType.SUMMARIZING,
              StatusType.MATCHING,
              StatusType.RETURNED,
            ].includes(statusID) && (
              <UploadProgress
                controllers={controllers}
                progressesSelector={progressesSelector}
              />
            )}
        </>
      )}
      {!isContractor && !isInternalExecutor && (
        <View style={styles.mt36}>
          <Text variant="title3" color={theme.text.basic}>
            Закрывающие документы
          </Text>
          <View style={{ marginTop: closureFiles.length ? 24 : 8 }}>
            {closureFiles.length ? (
              <>
                <DownloadManager
                  canDelete={canDelete}
                  files={closureFiles}
                  onDelete={onDelete}
                  uploadedFileIDs={uploadedFileIDs}
                />
                {!!statusID &&
                  ![
                    StatusType.WORK,
                    StatusType.MATCHING,
                    StatusType.SUMMARIZING,
                    StatusType.RETURNED,
                  ].includes(statusID) && (
                    <UploadProgress
                      controllers={controllers}
                      progressesSelector={progressesSelector}
                    />
                  )}
              </>
            ) : (
              <>
                <View style={styles.download}>
                  {!!statusID &&
                    ![
                      StatusType.WORK,
                      StatusType.SUMMARIZING,
                      StatusType.CLOSED,
                      StatusType.CANCELLED_BY_CUSTOMER,
                      StatusType.CANCELLED_BY_EXECUTOR,
                    ].includes(statusID) && <DownloadFilesIcon />}
                  <Text
                    variant="bodySRegular"
                    style={styles.desc}
                    color={theme.text.neutral}
                  >
                    {!!statusID &&
                    ![
                      StatusType.WORK,
                      StatusType.MATCHING,
                      StatusType.SUMMARIZING,
                      StatusType.RETURNED,
                      StatusType.CLOSED,
                      StatusType.CANCELLED_BY_CUSTOMER,
                      StatusType.CANCELLED_BY_EXECUTOR,
                    ].includes(statusID)
                      ? 'Загрузите чеки или иные финансовые документы общим размером не более 250 МВ'
                      : 'Пока здесь ничего нет'}
                  </Text>
                </View>
                {!!statusID &&
                  ![
                    StatusType.WORK,
                    StatusType.MATCHING,
                    StatusType.SUMMARIZING,
                    StatusType.RETURNED,
                  ].includes(statusID) && (
                    <UploadProgress
                      controllers={controllers}
                      progressesSelector={progressesSelector}
                    />
                  )}
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
