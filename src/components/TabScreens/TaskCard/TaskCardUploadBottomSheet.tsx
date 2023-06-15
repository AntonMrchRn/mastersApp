import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text, useTheme } from 'rn-ui-kit';

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
    },
  });

  const takeFromGallery = () => {
    onClose();
  };
  const takePictureOrVideo = () => {
    onClose();
  };
  const takeFromFiles = () => {
    onClose();
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
          <TouchableOpacity key={action.title} onPress={action.action}>
            <Spacer size={'l'} />
            <View style={styles.action}>
              <View style={styles.icon}>{action.icon}</View>
              <Text variant="bodyMRegular" color={theme.text.basic}>
                {action.title}
              </Text>
            </View>
            <Spacer size={'l'} separator="bottom" />
          </TouchableOpacity>
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
