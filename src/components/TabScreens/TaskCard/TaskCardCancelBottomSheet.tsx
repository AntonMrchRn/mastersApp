import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button, Input } from 'rn-ui-kit';

type TaskCardCancelBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onRefuse: () => void;
};
export const TaskCardCancelBottomSheet: FC<TaskCardCancelBottomSheetProps> = ({
  isVisible,
  onCancel,
  onRefuse,
}) => {
  const styles = StyleSheet.create({
    mt16: {
      marginTop: 16,
    },
    mt24: {
      marginTop: 24,
    },
    textLeft: {
      textAlign: 'left',
    },
  });

  return (
    <BottomSheet
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      title="Вы уверены, что хотите отказаться от задачи?"
      subtitle="Потом это действие нельзя будет отменить"
      titleStyle={styles.textLeft}
      subtitleStyle={styles.textLeft}
    >
      <View style={styles.mt24}>
        <Input variant={'textarea'} label="Причина отказа" />
        <Button
          size="M"
          variant="accent"
          label="Отмена"
          style={styles.mt24}
          onPress={onCancel}
        />
      </View>
      <Button
        size="M"
        variant="outlineDanger"
        label="Отказаться"
        style={styles.mt16}
        onPress={onRefuse}
      />
    </BottomSheet>
  );
};
