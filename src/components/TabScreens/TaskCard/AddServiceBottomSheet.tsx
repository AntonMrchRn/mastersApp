import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button } from 'rn-ui-kit';

type AddServiceBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
};
export const AddServiceBottomSheet: FC<AddServiceBottomSheetProps> = ({
  isVisible,
  onCancel,
}) => {
  const styles = StyleSheet.create({
    button: {
      marginTop: 24,
    },
    action: {
      marginVertical: 20,
    },
    container: {
      marginTop: 12,
    },
  });
  return (
    <BottomSheet
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      closeIcon
      closeIconPress={onCancel}
      title={'Добавление услуги'}
      subtitle={
        'Воспользуйтесь поиском или выберите подходящую категорию услуги'
      }
    >
      <View style={styles.container}>
        <Button
          style={styles.button}
          size="M"
          variant="outlineAccent"
          label="Отмена"
          onPress={onCancel}
        />
      </View>
    </BottomSheet>
  );
};
