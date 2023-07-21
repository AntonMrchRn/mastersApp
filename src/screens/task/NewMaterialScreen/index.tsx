import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretRightIcon } from '@/assets/icons/svg/estimate/CaretRightIcon';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppSelector } from '@/store';
import { selectTasks } from '@/store/slices/tasks/selectors';

import { styles } from './styles';

type NewMaterialScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.NewMaterial
>;
export const NewMaterialScreen: FC<NewMaterialScreenProps> = () => {
  const theme = useTheme();

  const { offerServices } = useAppSelector(selectTasks);

  const serviceNames = offerServices.reduce<string[]>((acc, val) => {
    if (val.name) {
      return acc.concat(val.name);
    }
    return acc;
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Text variant="title3" style={styles.title} color={theme.text.basic}>
          Добавить к услуге
        </Text>
        {serviceNames.map(name => {
          return (
            <View key={name}>
              <TouchableOpacity>
                <Spacer size={20} />
                <View style={styles.row}>
                  <Text variant="bodyMRegular" color={theme.text.basic}>
                    {name}
                  </Text>
                  <CaretRightIcon />
                </View>
                <Spacer size={20} />
              </TouchableOpacity>
              <Spacer size={0} separator="bottom" />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
