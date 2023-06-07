import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { BottomSheet, Button, InputDate } from 'rn-ui-kit';

type TaskCardDateBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onChange: () => void;
  value: string;
  onChangeText: (text: string) => void;
};
export const TaskCardDateBottomSheet: FC<TaskCardDateBottomSheetProps> = ({
  isVisible,
  onCancel,
  value,
  onChangeText,
  onChange,
}) => {
  const styles = StyleSheet.create({
    mt24: {
      marginTop: 24,
    },
  });
  const onMaskedText = (masked: string) => {
    onChangeText(masked);
  };
  return (
    <BottomSheet
      closeIcon
      closeIconPress={onCancel}
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      title="Дата окончания"
    >
      <InputDate
        containerStyle={{ width: '100%', marginTop: 24 }}
        value={value}
        onChangeText={onMaskedText}
      />
      <Button
        label="Изменить"
        style={styles.mt24}
        disabled={value.length < 8}
        onPress={onChange}
      />
    </BottomSheet>
  );
};
