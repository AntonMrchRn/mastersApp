import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';

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
      marginTop: 16,
    },
  });
  const methods = useForm({
    defaultValues: {
      serviceName: '',
    },
    mode: 'onChange',
  });
  const {
    formState: { errors },
    watch,
  } = methods;

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
          />
        </FormProvider>
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
