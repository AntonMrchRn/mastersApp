import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import { BottomSheet, Button, Text, useTheme } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';

type TaskCardUploadBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const TaskCardUploadBottomSheet: FC<TaskCardUploadBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const theme = useTheme();
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

  const takeFromGallery = () => {
    onClose();
  };
  const takePictureOrVideo = () => {
    onClose();
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
