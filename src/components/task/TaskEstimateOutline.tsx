import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Badge, Text, useTheme } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import { OutlayStatusType } from '@/types/task';

type TaskEstimateOutlineProps = {
  outlayStatusID: OutlayStatusType | undefined;
  onPress?: () => void;
};
export const TaskEstimateOutline: FC<TaskEstimateOutlineProps> = ({
  outlayStatusID,
  onPress,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    button: {
      flexDirection: 'row',
    },
    text: {
      marginLeft: 4,
    },
  });
  const getBadge = () => {
    switch (outlayStatusID) {
      case OutlayStatusType.READY:
        return <Badge variant="success" label="Смета согласована" secondary />;
      case OutlayStatusType.PENDING:
        return (
          <Badge variant="warning" label="Смета не согласована" secondary />
        );
      case OutlayStatusType.RETURNED:
        return <Badge variant="danger" label="Смета возвращена" secondary />;
      case OutlayStatusType.MATCHING:
        return (
          <Badge variant="accent" label="Смета на согласовании" secondary />
        );
      default:
        return <View />;
    }
  };
  return (
    <View style={styles.container}>
      {getBadge()}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <PlusIcon />
        <Text variant="bodySBold" color={theme.text.basic} style={styles.text}>
          Добавить
        </Text>
      </TouchableOpacity>
    </View>
  );
};
