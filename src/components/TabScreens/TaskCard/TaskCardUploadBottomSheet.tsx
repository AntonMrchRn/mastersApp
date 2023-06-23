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
import { useAppDispatch } from '@/store';
import { useGetTaskQuery } from '@/store/api/tasks';
import { deleteProgress } from '@/store/slices/tasks/actions';
import { HandleUpload } from '@/types/task';

type TaskCardUploadBottomSheetProps = {
  isVisible: boolean;
  taskId: string;
  onClose: () => void;
  handleUpload: ({ formData, files, date }: HandleUpload) => Promise<void>;
  onBanner: () => void;
};
export const TaskCardUploadBottomSheet: FC<TaskCardUploadBottomSheetProps> = ({
  isVisible,
  onClose,
  taskId,
  handleUpload,
  onBanner,
}) => {
  const theme = useTheme();
  const toast = useToast();
  const getTask = useGetTaskQuery(taskId);
  const dispatch = useAppDispatch();

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
  const MB = 1000000;
  const imgTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const checkSizes = ({
    sizes,
    isDoc,
  }: {
    sizes: { size: number; type: string }[];
    isDoc: boolean;
  }): boolean => {
    const allSizes = sizes.reduce<number>((acc, size) => acc + size.size, 0);
    if (allSizes >= MB * 250) {
      return false;
    }
    if (!isDoc) {
      const moreThan20MB = sizes.filter(siz => siz.size >= 20 * MB);
      if (moreThan20MB.length) {
        const moreThan20MBImage = moreThan20MB.find(si =>
          imgTypes.includes(si.type)
        );
        if (moreThan20MBImage) {
          return false;
        }
        const moreThan50MB = moreThan20MB.find(si => si.size >= 50 * MB);
        if (moreThan50MB) {
          return false;
        }
      }
    }
    return true;
  };
  const takeFromGallery = async () => {
    const date = new Date().toISOString();
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 10,
      });
      if (!result?.didCancel) {
        const formData = getFormData();
        let files: { name: string; size: number }[] = [];
        let sizes: { size: number; type: string }[] = [];
        result?.assets?.map((asset, index) => {
          formData.append(`file${Number(index) + 1}`, {
            uri: asset?.uri,
            type: asset.type,
            name: asset.fileName,
          });
          formData.append(`name${Number(index) + 1}`, asset?.fileName);
          files = files.concat({
            name: asset?.fileName || `name${Number(index) + 1}`,
            size: asset?.fileSize || 0,
          });
          sizes = sizes.concat({
            size: asset?.fileSize || 0,
            type: asset?.type || '',
          });
        });
        onClose();
        const check = checkSizes({ sizes, isDoc: false });
        if (check) {
          await handleUpload({ formData, files, date });
          getTask.refetch();
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
        error.data.message !== 'CanceledError: canceled'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    } finally {
      dispatch(deleteProgress(date));
    }
  };
  const takeMedia = async (mediaType: MediaType) => {
    const date = new Date().toISOString();
    try {
      const result = await launchCamera({ mediaType });
      if (result.errorCode === 'camera_unavailable') {
        toast.show({
          type: 'error',
          title: 'Камера недоступна',
          contentHeight: 100,
        });
      } else {
        if (!result?.didCancel) {
          const formData = getFormData();
          let files: { name: string; size: number }[] = [];
          let sizes: { size: number; type: string }[] = [];
          result?.assets?.map((asset, index) => {
            formData.append(`file${Number(index) + 1}`, {
              uri: asset?.uri,
              type: asset.type,
              name: asset.fileName,
            });
            formData.append(`name${Number(index) + 1}`, asset?.fileName);
            files = files.concat({
              name: asset?.fileName || `name${Number(index) + 1}`,
              size: asset?.fileSize || 0,
            });
            sizes = sizes.concat({
              size: asset?.fileSize || 0,
              type: asset?.type || '',
            });
          });
          onClose();
          const check = checkSizes({ sizes, isDoc: false });
          getTask.refetch();
          if (check) {
            await handleUpload({ formData, files, date });
            getTask.refetch();
          } else {
            onBanner();
          }
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
        error.data.message !== 'CanceledError: canceled'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    } finally {
      dispatch(deleteProgress(date));
    }
  };
  const takeFromFiles = async () => {
    const date = new Date().toISOString();
    try {
      const result = await DocumentPicker.pick();
      const formData = getFormData();
      let files: { name: string; size: number }[] = [];
      let sizes: { size: number; type: string }[] = [];
      result?.map((asset, index) => {
        formData.append(`file${Number(index) + 1}`, {
          uri: asset?.uri,
          type: asset.type,
          name: asset.name,
        });
        formData.append(`name${Number(index) + 1}`, asset?.name);
        files = files.concat({
          name: asset?.name || `name${Number(index) + 1}`,
          size: asset?.size || 0,
        });
        sizes = sizes.concat({
          size: asset?.size || 0,
          type: asset?.type || '',
        });
      });
      onClose();
      const check = checkSizes({ sizes, isDoc: false });
      getTask.refetch();
      if (check) {
        await handleUpload({ formData, files, date });
        getTask.refetch();
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
        error.data.message !== 'CanceledError: canceled'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    } finally {
      dispatch(deleteProgress(date));
    }
  };
  const takePicture = async () => {
    await takeMedia('photo');
  };
  const takeVideo = async () => {
    await takeMedia('video');
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
