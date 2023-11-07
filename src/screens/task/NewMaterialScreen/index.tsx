import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretRightIcon } from '@/assets/icons/svg/estimate/CaretRightIcon';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { styles } from './styles';

type NewMaterialScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.NewMaterial
>;
export const NewMaterialScreen: FC<NewMaterialScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  const {
    taskId,
    isEdit,
    services,
    fromEstimateSubmission,
    isSubmissionByCuratorItLots,
  } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Text variant="title3" style={styles.title} color={theme.text.basic}>
          Добавить к услуге
        </Text>
        {services.map(service => {
          const onPress = () => {
            navigation.navigate(AppScreenName.EstimateAddMaterial, {
              serviceId: service.ID as number,
              taskId,
              fromEstimateSubmission,
              isEdit,
              isSubmissionByCuratorItLots,
            });
          };
          return (
            <View key={service.ID}>
              <TouchableOpacity onPress={onPress} style={styles.row}>
                <Text variant="bodyMRegular" color={theme.text.basic}>
                  {service.name}
                </Text>
                <CaretRightIcon />
              </TouchableOpacity>
              <Spacer
                size={0}
                separator="bottom"
                separatorColor={theme.background.neutralDisableSecond}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
