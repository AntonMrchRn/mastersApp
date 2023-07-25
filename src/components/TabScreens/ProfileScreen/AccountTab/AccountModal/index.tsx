import React from 'react';

import { BottomSheet, Button, Spacer, useTheme } from 'rn-ui-kit';

import styles from './style';

type AccountModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onPress: () => void;
  modalType: 'exit' | 'deletion';
};

const AccountModal = ({
  isVisible,
  onPress,
  onClose,
  modalType,
}: AccountModalProps) => {
  const theme = useTheme();

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      titleStyle={styles.modalTitle}
      backdropTransitionOutTiming={0}
      subtitle={
        modalType === 'deletion'
          ? 'Потом это действие нельзя будет отменить'
          : undefined
      }
      title={
        modalType === 'exit'
          ? 'Вы уверены, что хотите выйти из профиля?'
          : 'Вы точно хотите удалить аккаунт?'
      }
    >
      <Spacer size="xxl" />
      <Button
        label={modalType === 'exit' ? 'Выйти' : 'Удалить аккаунт'}
        onPress={onPress}
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

export default AccountModal;
