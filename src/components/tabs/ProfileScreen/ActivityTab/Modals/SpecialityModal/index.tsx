import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  BottomSheet,
  Button,
  Spacer,
  Text,
  useTheme,
  useToast,
} from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { useEditUserMutation } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';
import { SpecialityFormValue } from '@/types/form';

import styles from './style';

type SpecialityModalProps = {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
  userSpeciality: string | null;
};

const SpecialityModal = ({
  userId,
  onClose,
  isVisible,
  userSpeciality,
}: SpecialityModalProps) => {
  const theme = useTheme();
  const toast = useToast();
  const [editSpeciality, { isError, error, isLoading, isSuccess }] =
    useEditUserMutation();
  const methods = useForm<SpecialityFormValue>({
    defaultValues: { speciality: userSpeciality || '' },
  });
  const {
    watch,
    reset,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = methods;
  const speciality = watch('speciality');

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset(getValues());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isVisible) {
      reset({ speciality: userSpeciality || '' });
    }
  }, [isVisible]);

  const onSave = async ({ speciality }: SpecialityFormValue) => {
    await editSpeciality({
      ID: userId,
      specialty: speciality,
    });
    reset(getValues());
  };

  return (
    <BottomSheet
      closeIcon
      avoidKeyboard
      title="Специализация"
      isVisible={isVisible}
      closeIconPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      titleStyle={styles.modalTitle}
      backdropTransitionOutTiming={0}
      closeIconContainerStyle={styles.closeIcon}
    >
      <>
        <Text
          variant="bodySRegular"
          color={theme.text.neutral}
          style={styles.text}
        >
          Напишите услуги, которые вы хотите оказывать. Эта информация будет
          видна координатору
        </Text>
        <FormProvider {...methods}>
          <ControlledInput
            variant="text"
            maxLength={70}
            name="speciality"
            autoCapitalize="none"
            style={styles.input}
            placeholder="Перечислите услуги через запятую"
          />
          <Spacer size="xl" />
          <Button
            label="Сохранить"
            isPending={isLoading}
            style={styles.btn}
            onPress={handleSubmit(onSave)}
            disabled={!speciality.trim().length || !isDirty}
          />
        </FormProvider>
      </>
    </BottomSheet>
  );
};

export default SpecialityModal;
