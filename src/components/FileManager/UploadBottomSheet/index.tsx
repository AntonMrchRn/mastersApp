import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BottomSheet, Button, Text, useTheme, useToast } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';
import { VideoIcon } from '@/assets/icons/svg/screens/VideoIcon';
import { configApp } from '@/constants/platform';
import { useAppDispatch } from '@/store';
import { useGetCompressRateQuery } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';
import { HandleUpload } from '@/types/fileManager';
import { checkSizes } from '@/utils/fileManager/checkSizes';
import { fillFormData } from '@/utils/fileManager/fillFormData';

import styles from './style';

export enum UploadAction {
  TakeFromGallery = 'TakeFromGallery',
  TakePhotoMedia = 'TakePhotoMedia',
  TakeVideoMedia = 'TakeVideoMedia',
  TakeFromFiles = 'TakeFromFiles',
}

type UploadBottomSheetProps = {
  isVisible: boolean;
  formData: FormData;
  onClose: () => void;
  onBanner: () => void;
  deleteProgress: ActionCreatorWithPayload<string>;
  handleUpload: ({ formData, files, date }: HandleUpload) => void;
  isUserFile?: boolean;
};

export const UploadBottomSheet = ({
  formData,
  onClose,
  onBanner,
  isVisible,
  handleUpload,
  deleteProgress,
  isUserFile = false,
}: UploadBottomSheetProps) => {
  const theme = useTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const compressRateQuery = useGetCompressRateQuery();
  const quality = compressRateQuery.data || 0.8;
  const uploadActions = {
    [UploadAction.TakeFromGallery]: async () =>
      await ImagePicker.openPicker({
        mediaType: isUserFile ? 'photo' : 'any',
        multiple: true,
        maxFiles: 10,
        compressImageQuality: quality,
      }),
    [UploadAction.TakePhotoMedia]: async () =>
      await ImagePicker.openCamera({
        mediaType: 'photo',
        compressImageQuality: quality,
      }),
    [UploadAction.TakeVideoMedia]: async () =>
      await ImagePicker.openCamera({ mediaType: 'video' }),
    [UploadAction.TakeFromFiles]: async () =>
      await DocumentPicker.pick({
        type: configApp.android
          ? [
              'image/jpeg',
              'image/png',
              'image/webp',
              'application/zip',
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'video/mpeg',
              'video/mp4',
              'video/ogg',
              'video/webm',
              'video/quicktime',
              'image/gif',
              'video/x-matroska',
            ]
          : [
              'public.jpg',
              'public.jpeg',
              'public.png',
              'public.zip-archive',
              'com.adobe.pdf',
              'public.content',
              'public.mpeg',
              'public.mpeg-4',
              'com.microsoft.excel.xls',
              'org.openxmlformats.spreadsheetml.sheet',
              'com.apple.quicktime-movie',
              'com.compuserve.gif',
            ],
      }),
  };

  const onUploadAction = async (actionType: UploadAction) => {
    const date = new Date().toISOString();

    try {
      const result = await uploadActions[actionType]();
      console.log(
        '🚀 ~ file: index.tsx:112 ~ onUploadAction ~ result:',
        result
      );
      const isDocuments = actionType === UploadAction.TakeFromFiles;

      if ((result as ImageOrVideo[]).length > 10) {
        return toast.show({
          type: 'error',
          title: 'Нельзя выбрать более 10 файлов',
        });
      }

      const { sizes, files, names } = fillFormData(
        formData,
        result,
        actionType
      );
      onClose();
      const check = checkSizes({
        sizes,
        isDoc: isDocuments,
        isUserFile,
      });

      if (check) {
        await handleUpload({
          formData,
          files,
          date,
          names,
        });
      } else {
        onBanner();
      }
    } catch (error) {
      onClose();
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data &&
        typeof error.data.message === 'string' &&
        (error as AxiosQueryErrorResponse).data.message !== 'canceled'
      ) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    } finally {
      dispatch(deleteProgress(date));
    }
  };

  const actions = [
    {
      icon: <GalleryIcon />,
      title: 'Выбрать из галереи',
      action: () => onUploadAction(UploadAction.TakeFromGallery),
    },
    {
      icon: <CameraIcon />,
      title: 'Сделать фото',
      action: () => onUploadAction(UploadAction.TakePhotoMedia),
    },
    ...(!isUserFile
      ? [
          {
            icon: <VideoIcon />,
            title: 'Сделать видео',
            action: () => onUploadAction(UploadAction.TakeVideoMedia),
          },
        ]
      : []),
    {
      icon: <FileIcon />,
      title: 'Выбрать из файлов',
      action: () => onUploadAction(UploadAction.TakeFromFiles),
    },
  ];

  return (
    <BottomSheet
      closeIcon
      isVisible={isVisible}
      title="Загрузка файлов"
      closeIconPress={onClose}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.container}>
        {actions.map(action => (
          <View key={action.title}>
            <TouchableOpacity onPress={action.action} style={styles.action}>
              <View style={styles.icon}>{action.icon}</View>
              <Text variant="bodyMRegular" color={theme.text.basic}>
                {action.title}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.line,
                { backgroundColor: theme.background.neutralDisableSecond },
              ]}
            />
          </View>
        ))}
        <Button
          size="M"
          variant="outlineAccent"
          label="Отмена"
          style={styles.mt24}
          onPress={onClose}
        />
      </View>
    </BottomSheet>
  );
};
