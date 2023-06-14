import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { BottomSheet, Button } from 'rn-ui-kit';

import ControlledInput from '@/components/ControlledInput';
import { cancelTaskValidationSchema } from '@/utils/formValidation';

type TaskCardCancelBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onRefuse: (text: string) => Promise<void>;
};
export const TaskCardCancelBottomSheet: FC<TaskCardCancelBottomSheetProps> = ({
  isVisible,
  onCancel,
  onRefuse,
}) => {
  const methods = useForm({
    defaultValues: { cancelTask: '' },
    resolver: yupResolver(cancelTaskValidationSchema),
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onRefucePress = ({ cancelTask }: { cancelTask: string }) => {
    onRefuse(cancelTask);
  };

  const styles = StyleSheet.create({
    mt16: {
      marginTop: 16,
    },
    mt24: {
      marginTop: 24,
    },
    textLeft: {
      textAlign: 'left',
    },
  });

  return (
    <BottomSheet
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      title="Вы уверены, что хотите отказаться от задачи?"
      subtitle="Потом это действие нельзя будет отменить"
      titleStyle={styles.textLeft}
      subtitleStyle={styles.textLeft}
    >
      <FormProvider {...methods}>
        <View style={styles.mt24}>
          <ControlledInput
            name={'cancelTask'}
            variant={'textarea'}
            label="Причина отказа"
          />
          <Button
            size="M"
            variant="accent"
            label="Отмена"
            style={styles.mt24}
            onPress={onCancel}
          />
        </View>
        <Button
          size="M"
          variant="outlineDanger"
          label="Отказаться"
          style={styles.mt16}
          onPress={methods.handleSubmit(onRefucePress)}
          disabled={!isValid}
        />
      </FormProvider>
    </BottomSheet>
  );
};
