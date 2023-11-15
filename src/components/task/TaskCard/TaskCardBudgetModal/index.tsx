import React from 'react';
import { View } from 'react-native';

import { Button, Modal } from 'rn-ui-kit';

type TaskCardBudgetModalProps = {
  isVisible: boolean;
  isCurator: boolean;
  onCancel: () => void;
  onRevoke: () => void;
};

import { styles } from './styles';

export const TaskCardBudgetModal = ({
  isVisible,
  isCurator,
  onCancel,
  onRevoke,
}: TaskCardBudgetModalProps) => (
  <Modal
    isVisible={isVisible}
    headerIcon="error"
    title="Вы точно хотите отозвать смету?"
    description={`Без отправленной сметы вас не будут рассматривать на роль ${
      isCurator ? 'куратора' : 'исполнителя'
    }`}
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
