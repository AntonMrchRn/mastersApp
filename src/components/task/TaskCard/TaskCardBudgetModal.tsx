import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Modal } from 'rn-ui-kit';

type TaskCardBudgetModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onRevoke: () => void;
};
export const TaskCardBudgetModal: FC<TaskCardBudgetModalProps> = ({
  isVisible,
  onCancel,
  onRevoke,
}) => {
  const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    modalButton: {
      width: '48%',
    },
  });

  return (
    <Modal
      closeIcon
      closeIconPress={onCancel}
      isVisible={isVisible}
      headerIcon="error"
      title="Вы точно хотите отозвать смету?"
      description="Без отправленной сметы вас не будут рассматривать на роль исполнителя"
    >
      <View style={styles.buttons}>
        <Button
          size="S"
          variant="outlineAccent"
          label="Отмена"
          style={styles.modalButton}
          onPress={onCancel}
        />
        <Button
          size="S"
          variant="danger"
          label="Отозвать"
          style={styles.modalButton}
          onPress={onRevoke}
        />
      </View>
    </Modal>
  );
};
