import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Modal } from 'rn-ui-kit';

type DeleteEstimateModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onDelete: () => void;
};
export const DeleteEstimateModal: FC<DeleteEstimateModalProps> = ({
  isVisible,
  onCancel,
  onDelete,
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
      title="Удалить услугу?"
      description="Все связанные с ней материалы также будут удалены"
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
          label="Удалить"
          style={styles.modalButton}
          onPress={onDelete}
        />
      </View>
    </Modal>
  );
};
