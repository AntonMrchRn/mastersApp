import React from 'react';
import { useDispatch } from 'react-redux';

import { BottomSheet, Button, Spacer, useTheme } from 'rn-ui-kit';

import { storageMMKV } from '@/mmkv/storage';
import { logOut } from '@/store/slices/auth/actions';

import styles from './style';

type ExitModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ExitModal = ({ isVisible, onClose }: ExitModalProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onExit = () => {
    onClose();
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      titleStyle={styles.modalTitle}
      backdropTransitionOutTiming={0}
      title="Вы уверены, что хотите выйти из профиля?"
    >
      <Spacer size="xxl" />
      <Button
        label="Выйти"
        onPress={onExit}
        style={{ backgroundColor: theme.background.danger }}
      />
      <Spacer size="l" />
      <Button
        label="Отмена"
        onPress={onClose}
        labelStyle={{ color: theme.text.accent }}
        style={[
          styles.cancelBtn,
          {
            backgroundColor: theme.background.main,
            borderColor: theme.stroke.accent,
          },
        ]}
      />
      <Spacer size="l" />
    </BottomSheet>
  );
};

export default ExitModal;
