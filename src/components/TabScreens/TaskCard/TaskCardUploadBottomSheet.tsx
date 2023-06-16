import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { BottomSheet, Button, Text, useTheme } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';
import { usePostTasksFilesMutation } from '@/store/api/tasks';

type TaskCardUploadBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const TaskCardUploadBottomSheet: FC<TaskCardUploadBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const theme = useTheme();
  const [postTasksFiles, taskFilesMutation] = usePostTasksFilesMutation();
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

  const takeFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 10,
      });
      if (!result?.didCancel) {
        console.log(
          '🚀 ~ file: TaskCardUploadBottomSheet.tsx:46 ~ takeFromGallery ~ result:',
          result
        );
        const formData = new FormData();
        formData.append('taskID', 978);
        formData.append('isApplication', true);
        formData.append('isOffer', false);
        formData.append('isCheck', false);
        result?.assets?.map((asset, index) => {
          formData.append(`file${Number(index) + 1}`, {
            uri: asset?.uri,
            type: asset.type,
            name: asset.fileName,
          });
          formData.append(`name${Number(index) + 1}`, asset?.fileName);
        });
        const responce = await postTasksFiles(formData);
        console.log(
          '🚀 ~ file: TaskCardUploadBottomSheet.tsx:68 ~ takeFromGallery ~ responce:',
          responce
        );
      }
      onClose();
    } catch (err) {
      console.log(
        '🚀 ~ file: TaskCardUploadBottomSheet.tsx:49 ~ takeFromGallery ~ err:',
        err
      );
    }
  };
  const takePictureOrVideo = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'mixed',
      });
      if (!result?.didCancel) {
        console.log(
          '🚀 ~ file: TaskCardUploadBottomSheet.tsx:46 ~ takePictureOrVideo ~ result:',
          result
        );
      }
      onClose();
    } catch (err) {
      console.log(
        '🚀 ~ file: TaskCardUploadBottomSheet.tsx:55 ~ takePictureOrVideo ~ err:',
        err
      );
    }
  };
  const takeFromFiles = async () => {
    try {
      const doc = await DocumentPicker.pick();
      console.log(
        '🚀 ~ file: TaskCardUploadBottomSheet.tsx:50 ~ takeFromFiles ~ doc:',
        doc
      );
      onClose();
    } catch (err) {
      console.log(
        '🚀 ~ file: TaskCardUploadBottomSheet.tsx:53 ~ takeFromFiles ~ err:',
        err
      );
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
      title: 'Сделать фото или видео',
      action: takePictureOrVideo,
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
      <View style={styles.mt24}>
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
