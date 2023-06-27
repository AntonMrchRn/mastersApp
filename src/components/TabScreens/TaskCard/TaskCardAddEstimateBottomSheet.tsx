import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text } from 'rn-ui-kit';

type TaskCardAddEstimateBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  pressMaterial: () => void;
  pressService: () => void;
};
export const TaskCardAddEstimateBottomSheet: FC<
  TaskCardAddEstimateBottomSheetProps
> = ({ isVisible, onCancel, pressMaterial, pressService }) => {
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
    <BottomSheet onSwipeComplete={onCancel} isVisible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pressMaterial}>
          <Text style={styles.action} variant={'bodyMRegular'}>
            Добавить материал
          </Text>
          <Spacer size={0} separator="bottom" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressService}>
          <Text style={styles.action} variant={'bodyMRegular'}>
            Добавить услугу
          </Text>
          <Spacer size={0} separator="bottom" />
        </TouchableOpacity>
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
