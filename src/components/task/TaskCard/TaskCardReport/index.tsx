import React, { useState } from 'react';

import { UploadBottomSheet } from '@/components/FileManager/UploadBottomSheet';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import {
  useDeleteTaskFileMutation,
  usePostTasksFilesMutation,
} from '@/store/api/tasks';
import { deleteProgress } from '@/store/slices/tasks/actions';
import { Controllers, File, HandleUpload } from '@/types/fileManager';
import { StatusType, TaskType } from '@/types/task';
import { getFormData } from '@/utils/fileManager/getFormData';
import { saveFiles } from '@/utils/fileManager/saveFiles';

import { Content } from './Content';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusID: StatusType | undefined;
  reportFiles: File[];
  closureFiles: File[];
  taskId: number;
  subsetID: TaskType | undefined;
  isCurator: boolean;
  uploadModalVisible: boolean;
  onClose: () => void;
  toClose: boolean | undefined;
  uploadLimitBannerVisible: boolean;
  isContractor: boolean;
  isInvitedExecutor: boolean;
  isInternalExecutor: boolean;
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
  onClose,
  toClose,
  isContractor,
  isInvitedExecutor,
  isInternalExecutor,
  onUploadLimitBannerVisible,
  uploadLimitBannerVisible,
}: TaskCardReportProps) => {
  const [postFiles] = usePostTasksFilesMutation();
  const [deleteFile] = useDeleteTaskFileMutation();

  const [uploadedFileIDs, setUploadedFileIDs] = useState<number[]>([]);

  const handleUpload = async ({ formData, files, date }: HandleUpload) => {
    try {
      const controller = new AbortController();
      controllers = { ...controllers, [date]: controller };
      const addedFiles = await postFiles({
        formData,
        files,
        date,
        signal: controller.signal,
      }).unwrap();

      saveFiles(addedFiles, setUploadedFileIDs);
    } catch (err) {
      console.log('handleUpload error: ', err);
    }
  };

  const onDelete = async ({ fileID }: { fileID?: number }) => {
    fileID && (await deleteFile(fileID).unwrap());
  };

  const onBanner = () => {
    !uploadLimitBannerVisible && onUploadLimitBannerVisible();
  };

  //* в статусе Опубликовано мы не показываем документы и не даем возможности их загрузить
  if (statusID === StatusType.ACTIVE) {
    return (
      <PreviewNotFound
        type={
          activeBudgetCanceled
            ? PreviewNotFoundType.ReportNotAvailable
            : PreviewNotFoundType.ReportNotYetAvailable
        }
        text={
          subsetID === TaskType.IT_AUCTION_SALE &&
          !isInvitedExecutor &&
          !isContractor
            ? 'Просмотр загруженных исполнителем файлов будет доступен, когда задача перейдет в работу'
            : undefined
        }
      />
    );
  }
  return (
    <>
      <UploadBottomSheet
        onClose={onClose}
        onBanner={onBanner}
        handleUpload={handleUpload}
        isVisible={uploadModalVisible}
        formData={getFormData({ taskId, toClose, statusID })}
        deleteProgress={deleteProgress}
        //* в загруженные документы нельзя кидать видео
        toClose={
          toClose ||
          (statusID &&
            [StatusType.PAID, StatusType.COMPLETED].includes(statusID))
        }
      />
      <Content
        reportFiles={reportFiles}
        onDelete={onDelete}
        uploadedFileIDs={uploadedFileIDs}
        closureFiles={closureFiles}
        toClose={toClose}
        statusID={statusID}
        isCurator={isCurator}
        isContractor={isContractor}
        isInternalExecutor={isInternalExecutor}
      />
    </>
  );
};
