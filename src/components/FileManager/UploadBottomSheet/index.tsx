import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BottomSheet, Button, Text, useTheme, useToast } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';
import { VideoIcon } from '@/assets/icons/svg/screens/VideoIcon';
import { useAppDispatch } from '@/store';
import { AxiosQueryErrorResponse } from '@/types/error';
import { HandleUpload } from '@/types/fileManager';
import { checkSizes } from '@/utils/fileManager/checkSizes';
import { fillFormData } from '@/utils/fileManager/fillFormData';

import styles from './style';

enum UploadAction {
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

  const uploadActions = {
    [UploadAction.TakeFromGallery]: async () =>
      await launchImageLibrary({
        mediaType: isUserFile ? 'photo' : 'mixed',
        selectionLimit: 10,
      }),
    [UploadAction.TakePhotoMedia]: async () =>
      await launchCamera({ mediaType: 'photo' }),
    [UploadAction.TakeVideoMedia]: async () =>
      await launchCamera({ mediaType: 'video' }),
    [UploadAction.TakeFromFiles]: async () => await DocumentPicker.pick(),
  };

  const onUploadAction = async (actionType: UploadAction) => {
    const date = new Date().toISOString();

    try {
      const result = await uploadActions[actionType]();
      const isMediaError =
        (actionType === UploadAction.TakePhotoMedia ||
          actionType === UploadAction.TakeVideoMedia) &&
        (result as ImagePickerResponse).errorCode === 'camera_unavailable';
      const isDocuments = actionType === UploadAction.TakeFromFiles;

      if (isMediaError) {
        return toast.show({
          type: 'error',
          title: 'Камера недоступна',
        });
      }

      if (
        isDocuments ||
        (!isDocuments && !(result as ImagePickerResponse)?.didCancel)
      ) {
        const { sizes, files, names } = fillFormData(
          formData,
          result,
          isDocuments
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
