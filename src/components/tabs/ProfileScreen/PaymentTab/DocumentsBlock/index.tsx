import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Banner, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { UploadIcon } from '@/assets/icons/svg/files/UploadIcon';
import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { UploadBottomSheet } from '@/components/FileManager/UploadBottomSheet';
import { UploadProgress } from '@/components/FileManager/UploadProgress';
import Title from '@/components/tabs/ProfileScreen/Title';
import { useAppSelector } from '@/store';
import { useAddFilesMutation, useDeleteFileMutation } from '@/store/api/user';
import { deleteProgress } from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { Controllers, File, HandleUpload } from '@/types/fileManager';
import { ProfileTab } from '@/types/tab';
import { getFormData } from '@/utils/fileManager/getFormData';
import { saveFiles } from '@/utils/fileManager/saveFiles';

import styles from './style';

type DocumentsBlockProps = {
  files: File[];
  scrollToEnd: () => void;
  activeTab: ProfileTab;
};

let controllers: Controllers = {};

const DocumentsBlock = ({
  files,
  scrollToEnd,
  activeTab,
}: DocumentsBlockProps) => {
  const theme = useTheme();
  const toast = useToast();
  const isFocused = useIsFocused();

  const [addFiles, { isLoading, isSuccess }] = useAddFilesMutation();
  const [deleteFile] = useDeleteFileMutation();

  const progressesSelector = useAppSelector(selectUser).progresses;

  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [uploadedFileIDs, setUploadedFileIDs] = useState<number[]>([]);

  useEffect(() => {
    if (isLoading || isSuccess) {
      scrollToEnd();
    }
  }, [Object.keys(controllers)]);

  useEffect(() => {
    if (isBannerVisible) {
      scrollToEnd();
    }

    if (isModalVisible && isBannerVisible) {
      onBanner();
    }
  }, [isBannerVisible, isModalVisible]);

  useEffect(() => {
    if (!isFocused && isBannerVisible) {
      onBanner();
    }

    if (isBannerVisible) {
      onBanner();
    }
  }, [isFocused, activeTab]);

  const onBanner = () => setIsBannerVisible(!isBannerVisible);
  const onModal = () => setIsModalVisible(!isModalVisible);

  const handleUpload = async ({
    formData,
    files: uploadFiles,
    date,
  }: HandleUpload) => {
    const allFilesLength = files.length + uploadFiles.length;
    if (allFilesLength > 10) {
      return toast.show({
        type: 'error',
        title: 'Не более 10 вложений одновременно',
      });
    }
    try {
      const controller = new AbortController();
      controllers = { ...controllers, [date]: controller };

      const addedFiles = await addFiles({
        formData,
        files: uploadFiles,
        date,
        signal: controller.signal,
      }).unwrap();

      saveFiles(addedFiles, setUploadedFileIDs, 'user');
    } catch (err) {
      console.log('handleUpload error', err);
    }
  };

  const onDelete = async ({ fileID }: { fileID?: number }) => {
    fileID && (await deleteFile(fileID).unwrap());
  };
  return (
    <>
      <Title
        withButton={files.length < 10}
        title="Документы"
        onPress={onModal}
        buttonLabel={files.length ? 'Загрузить еще' : 'Загрузить'}
        icon={<UploadIcon fill={theme.icons.basic} />}
      />
      <Spacer size="xl" />
      {files.length ? (
        <>
          <DownloadManager
            files={files}
            fileType="user"
            onDelete={onDelete}
            uploadedFileIDs={uploadedFileIDs}
          />
          <UploadProgress
            controllers={controllers}
            progressesSelector={progressesSelector}
          />
        </>
      ) : (
        <>
          <View style={styles.preview}>
            <DownloadFilesIcon />
            <Text
              variant="bodySRegular"
              style={styles.defaultText}
              color={theme.text.neutral}
            >
              При необходимости загрузите файлы для подтверждения учетной
              записи. Максимальный размер одного файла не более 5 МВ
            </Text>
          </View>
          <UploadProgress
            controllers={controllers}
            progressesSelector={progressesSelector}
          />
        </>
      )}
      <UploadBottomSheet
        isUserFile
        onClose={onModal}
        onBanner={onBanner}
        formData={getFormData({})}
        isVisible={isModalVisible}
        handleUpload={handleUpload}
        deleteProgress={deleteProgress}
      />
      {isBannerVisible && (
        <Banner
          containerStyle={styles.banner}
          onClosePress={onBanner}
          type={'error'}
          icon={'alert'}
          title="Превышен лимит загрузки"
          text={
            'Максимальный размер загружаемого \n файла: 5 МБ. \n Допустимые форматы: jpg, jpeg, png,\n webp, doc, docx, pdf'
          }
        />
      )}
    </>
  );
};

export default DocumentsBlock;
