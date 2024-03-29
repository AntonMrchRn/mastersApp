import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Modal } from 'rn-ui-kit';

type DeleteEstimateMaterialModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onDelete: () => void;
};
export const DeleteEstimateMaterialModal: FC<
  DeleteEstimateMaterialModalProps
> = ({ isVisible, onCancel, onDelete }) => {
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
    <Modal isVisible={isVisible} headerIcon="error" title="Удалить материал?">
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
