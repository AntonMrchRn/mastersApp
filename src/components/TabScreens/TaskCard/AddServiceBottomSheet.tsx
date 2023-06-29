import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import {
  BottomSheet,
  Button,
  CheckBox,
  Spacer,
  Text,
  useTheme,
} from 'rn-ui-kit';

import { SearchIcon } from '@/assets/icons/svg/estimate/SearchIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { useGetServicesCategoriesQuery } from '@/store/api/tasks';

type AddServiceBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
};
export const AddServiceBottomSheet: FC<AddServiceBottomSheetProps> = ({
  isVisible,
  onCancel,
}) => {
  const theme = useTheme();

  const categories = useGetServicesCategoriesQuery();

  const styles = StyleSheet.create({
    button: {
      marginTop: 24,
    },
    title: {
      marginTop: 24,
      marginBottom: 12,
    },
    container: {
      marginTop: 16,
    },
    item: {
      marginVertical: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

  const methods = useForm({
    defaultValues: {
      serviceName: '',
    },
    mode: 'onChange',
  });
  const { watch } = methods;

  const serviceName = watch('serviceName');

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
        <FormProvider {...methods}>
          <ControlledInput
            name={'serviceName'}
            placeholder={'Искать по названию'}
            variant={'text'}
            keyboardType="numeric"
            iconLeft={<SearchIcon />}
          />
        </FormProvider>
        <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
          Категории
        </Text>
        {categories.isLoading ? (
          <ActivityIndicator />
        ) : (
          categories?.data?.categories?.map(category => {
            return (
              <View key={category.ID}>
                <View style={styles.item}>
                  <View style={styles.row}>
                    <Text variant={'bodyMRegular'} color={theme.text.basic}>
                      {category.name}
                    </Text>
                    <CheckBox checked={false} />
                  </View>
                </View>
                <Spacer size={0} separator="bottom" />
              </View>
            );
          })
        )}
        <Button
          style={styles.button}
          size="M"
          label="Выбрать"
          onPress={onCancel}
        />
      </View>
    </BottomSheet>
  );
};
