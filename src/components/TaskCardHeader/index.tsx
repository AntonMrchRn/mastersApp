import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

type TaskCardHeaderProps = {
  navigation: StackNavigationProp<
    TaskSearchNavigationParamList,
    TaskSearchNavigatorScreenName.TaskCard,
    undefined
  >;
  title: string;
  description: string;
};

export const TaskCardHeader: FC<TaskCardHeaderProps> = ({
  navigation,
  title,
  description,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: 45,
      alignItems: 'center',
      width: '100%',
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
      width: '15%',
      height: '100%',
    },
    title: {
      color: theme.text.basic,
    },
    description: {
      color: theme.text.neutral,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={navigation?.goBack}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text variant="bodyMBold" style={styles.title}>
          {title}
        </Text>
        <Text variant="captionRegular" style={styles.description}>
          {description}
        </Text>
      </View>
      <View style={styles.fix} />
    </View>
  );
};
