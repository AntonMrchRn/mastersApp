import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { BottomSheet, Button, Spacer } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { configApp } from '@/constants/platform';
import { useKeyboard } from '@/hooks/useKeyboard';
import { cancelTaskValidationSchema } from '@/utils/formValidation';

import styles from './styles';

type TaskCardCancelBottomSheetProps = {
  isVisible: boolean;
  withReason: boolean;
  onCancel: () => void;
  isContractor: boolean;
  onRefuse: (refuseReason?: string) => Promise<void>;
};
export const TaskCardCancelBottomSheet = ({
  isVisible,
  onCancel,
  onRefuse,
  isContractor,
  withReason,
}: TaskCardCancelBottomSheetProps) => {
  const [canceled, setCanceled] = useState(false);

  const isKeyboardVisible = useKeyboard();
  const methods = useForm({
    defaultValues: { cancelTask: '' },
    resolver: yupResolver(cancelTaskValidationSchema(withReason)),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = methods;
  const isDisabled = !isValid && !!Object.keys(errors).length;

  const onRefusePress = ({ cancelTask }: { cancelTask?: string }) => {
    reset();
    onRefuse(cancelTask);
  };
  const handleCancel = () => {
    if (!canceled) {
      setCanceled(true);
      reset();
      onCancel();
    }
  };
  const onModalHide = () => {
    setCanceled(false);
  };
  return (
    <BottomSheet
      avoidKeyboard
      isVisible={isVisible}
      titleStyle={styles.title}
      onSwipeComplete={handleCancel}
      onBackdropPress={handleCancel}
      title={
        isContractor && !withReason
          ? 'Отклонить предложение куратора?'
          : 'Вы уверены, что хотите отказаться от задачи?'
      }
      subtitle="Потом это действие нельзя будет отменить"
      containerStyle={configApp.ios && isKeyboardVisible && styles.pb10}
      onModalHide={onModalHide}
    >
      <FormProvider {...methods}>
        <View style={withReason && styles.mt24}>
          {withReason && (
            <ControlledInput
              name={'cancelTask'}
              variant={'textarea'}
              label="Причина отказа"
            />
          )}
          <Button
            style={styles.mt24}
            disabled={canceled || (withReason ? !isValid : isDisabled)}
            isPending={canceled}
            variant="outlineDanger"
            onPress={handleSubmit(onRefusePress)}
            label={isContractor && !withReason ? 'Отклонить' : 'Отказаться'}
          />
        </View>
        <Button
          style={styles.mt16}
          size="M"
          label="Отмена"
          variant="accent"
          onPress={handleCancel}
        />
      </FormProvider>
      <Spacer size={configApp.ios ? 'xs' : 'l'} />
    </BottomSheet>
  );
};
