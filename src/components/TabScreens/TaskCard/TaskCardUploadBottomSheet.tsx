import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

import { BottomSheet, Button, Text, useTheme, useToast } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';
import { VideoIcon } from '@/assets/icons/svg/screens/VideoIcon';
import { configApp } from '@/constants/platform';
import { useGetTaskQuery, usePostTasksFilesMutation } from '@/store/api/tasks';

type TaskCardUploadBottomSheetProps = {
  isVisible: boolean;
  taskId: string;
  onClose: () => void;
};
export const TaskCardUploadBottomSheet: FC<TaskCardUploadBottomSheetProps> = ({
  isVisible,
  onClose,
  taskId,
}) => {
  const theme = useTheme();
  const toast = useToast();

  const getTask = useGetTaskQuery(taskId);

  const [postTasksFiles] = usePostTasksFilesMutation();

  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    mt24: {
      marginTop: 24,
    },
    container: {
      marginTop: 24,
      paddingBottom: configApp.android ? 20 : 0,
    },
    action: {
      flexDirection: 'row',
      paddingVertical: 16,
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: theme.background.neutralDisableSecond,
    },
  });

  const getFormData = () => {
    const formData = new FormData();
    formData.append('taskID', taskId);
    formData.append('isApplication', true);
    formData.append('isOffer', false);
    formData.append('isCheck', false);
    return formData;
  };

  const takeFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 10,
      });
      if (!result?.didCancel) {
        const formData = getFormData();
        result?.assets?.map((asset, index) => {
          formData.append(`file${Number(index) + 1}`, {
            uri: asset?.uri,
            type: asset.type,
            name: asset.fileName,
          });
          formData.append(`name${Number(index) + 1}`, asset?.fileName);
        });
        onClose();
        await postTasksFiles(formData).unwrap();
        getTask.refetch();
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
        typeof error.data.message === 'string'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    }
  };
  const takeMedia = async (mediaType: MediaType) => {
    try {
      const result = await launchCamera({
        mediaType,
      });
      if (!result?.didCancel) {
        const formData = getFormData();
        result?.assets?.map((asset, index) => {
          formData.append(`file${Number(index) + 1}`, {
            uri: asset?.uri,
            type: asset.type,
            name: asset.fileName,
          });
          formData.append(`name${Number(index) + 1}`, asset?.fileName);
        });
        onClose();
        await postTasksFiles(formData).unwrap();
        getTask.refetch();
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
        typeof error.data.message === 'string'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    }
  };
  const takePicture = async () => {
    takeMedia('photo');
  };
  const takeVideo = async () => {
    takeMedia('video');
  };
  const takeFromFiles = async () => {
    try {
      const result = await DocumentPicker.pick();
      const formData = getFormData();
      result?.map((asset, index) => {
        formData.append(`file${Number(index) + 1}`, {
          uri: asset?.uri,
          type: asset.type,
          name: asset.name,
        });
        formData.append(`name${Number(index) + 1}`, asset?.name);
      });
      onClose();
      await postTasksFiles(formData).unwrap();
      getTask.refetch();
    } catch (error) {
      onClose();
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data &&
        typeof error.data.message === 'string'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    }
  };

  const actions = [
    {
      icon: <GalleryIcon />,
      title: 'Выбрать из галереи',
      action: takeFromGallery,
    },
    {
      icon: <CameraIcon />,
      title: 'Сделать фото',
      action: takePicture,
    },
    {
      icon: <VideoIcon />,
      title: 'Сделать видео',
      action: takeVideo,
    },
    {
      icon: <FileIcon />,
      title: 'Выбрать из файлов',
      action: takeFromFiles,
    },
  ];

  return (
    <BottomSheet
      onSwipeComplete={onClose}
      isVisible={isVisible}
      title="Загрузка файлов"
      closeIcon
      closeIconPress={onClose}
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
            <View style={styles.line} />
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
