import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Badge, Text, useTheme } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import { OutlayStatusType } from '@/types/task';

import { styles } from './styles';

type TaskEstimateOutlineProps = {
  outlayStatusID: OutlayStatusType | undefined;
  showEstimateStatus: boolean;
  showAddButton: boolean;
  onPress?: () => void;
};
export const TaskEstimateOutline: FC<TaskEstimateOutlineProps> = ({
  onPress,
  showAddButton,
  outlayStatusID,
  showEstimateStatus,
}) => {
  const theme = useTheme();
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
      {showEstimateStatus && getBadge()}
      {showAddButton && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <PlusIcon fill={theme.icons.basic} />
          <Text
            variant="bodySBold"
            color={theme.text.basic}
            style={styles.text}
          >
            Добавить
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
