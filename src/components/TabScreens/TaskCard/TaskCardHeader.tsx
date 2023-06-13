import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';

type TaskCardHeaderProps = {
  goBack: () => void;
  title: string;
  description: string;
};

export const TaskCardHeader: FC<TaskCardHeaderProps> = ({
  goBack,
  title,
  description,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: 45,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
    },
    btnBack: {
      width: 45,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      alignItems: 'center',
    },
    fix: {
      width: 45,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={goBack}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        {title && (
          <Text variant="bodyMBold" color={theme.text.basic}>
            {title}
          </Text>
        )}
        {description && (
          <Text variant="captionRegular" color={theme.text.neutral}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.fix} />
    </View>
  );
};
