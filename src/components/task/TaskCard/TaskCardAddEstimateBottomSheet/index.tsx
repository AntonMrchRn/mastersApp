import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { styles } from './styles';

type TaskCardAddEstimateBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  pressMaterial: () => void;
  pressService: () => void;
};

export const TaskCardAddEstimateBottomSheet = ({
  isVisible,
  onCancel,
  pressMaterial,
  pressService,
}: TaskCardAddEstimateBottomSheetProps) => {
  const theme = useTheme();
  return (
    <BottomSheet onSwipeComplete={onCancel} isVisible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pressMaterial}>
          <Text style={styles.action} variant={'bodyMRegular'}>
            Добавить материал
          </Text>
          <Spacer
            size="l"
            separator="bottom"
            separatorColor={theme.background.neutralDisableSecond}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressService}>
          <Text style={styles.action} variant={'bodyMRegular'}>
            Добавить услугу
          </Text>
          <Spacer
            size="l"
            separator="bottom"
            separatorColor={theme.background.neutralDisableSecond}
          />
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
