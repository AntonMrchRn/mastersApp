import React, { useEffect } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CheckBox, Spacer, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { Type } from '@/components/TabScreens/ProfileScreen/EntityTypeModal/index';
import NDSPayerTooltip from '@/components/TabScreens/ProfileScreen/NDSPayerTooltip';
import { useEditUserMutation } from '@/store/api/user';
import { User } from '@/store/api/user/types';
import { EntityTypeFormValues } from '@/types/form';
import { UserEntityType } from '@/types/user';
import {
  companyEntityValidationSchema,
  individualEntityValidationSchema,
  selfEmployedEntityValidationSchema,
} from '@/utils/formValidation';

import styles from './style';

type TypeSelectionStepProps = {
  selectedType: Type;
  onCloseModal: () => void;
  typeValues: Pick<User, 'ID' | 'ITIN' | 'RRC' | 'entityName' | 'isNDSPayer'>;
};

const DataEditingStep = ({
  selectedType,
  typeValues,
  onCloseModal,
}: TypeSelectionStepProps) => {
  const toast = useToast();
  const [editEntityType, { isError, isLoading, isSuccess }] =
    useEditUserMutation();

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: 'Изменение данных невозможно',
        contentHeight: 100,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  const { id, description } = selectedType;
  const isCompany = description === UserEntityType.company;
  const isIndividual = description === UserEntityType.individual;
  const defaultRRC = { RRC: typeValues.RRC || '' };
  const defaultITIN = { ITIN: typeValues.ITIN || '' };
  const defaultEntityName = { entityName: typeValues.entityName || '' };
  const defaultIsNDSPayer = { isNDSPayer: typeValues.isNDSPayer || false };

  const formProps = {
    [UserEntityType.self]: {
      defaultValues: defaultITIN,
      validationSchema: selfEmployedEntityValidationSchema,
    },
    [UserEntityType.individual]: {
      defaultValues: {
        ...defaultITIN,
        ...defaultEntityName,
        ...defaultIsNDSPayer,
      },
      validationSchema: individualEntityValidationSchema,
    },
    [UserEntityType.company]: {
      defaultValues: {
        ...defaultITIN,
        ...defaultEntityName,
        ...defaultIsNDSPayer,
        ...defaultRRC,
      },
      validationSchema: companyEntityValidationSchema,
    },
  };

  const methods = useForm<EntityTypeFormValues>({
    defaultValues: formProps[description].defaultValues,
    resolver: yupResolver(formProps[description].validationSchema),
    mode: 'onBlur',
  });
  const {
    watch,
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;
  const RRC = watch('RRC');
  const ITIN = watch('ITIN');
  const { field } = useController({
    control,
    name: 'isNDSPayer',
  });

  useEffect(() => {
    if (isCompany && ITIN.length === 12 && isDirty) {
      setFocus('RRC');
    }
  }, [ITIN]);

  useEffect(() => {
    if (isCompany && RRC && RRC.length === 9 && isDirty) {
      Keyboard.dismiss();
    }
  }, [RRC]);

  const onSave = async ({
    RRC,
    ITIN,
    entityName,
    isNDSPayer,
  }: EntityTypeFormValues) => {
    const params = {
      [UserEntityType.self]: {
        ITIN,
      },
      [UserEntityType.individual]: {
        ITIN,
        entityName,
        isNDSPayer,
      },
      [UserEntityType.company]: {
        ITIN,
        RRC,
        entityName,
        isNDSPayer,
      },
    };

    await editEntityType({
      ID: typeValues.ID,
      entityTypeId: id,
      ...params[description],
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <Spacer />
        {(isIndividual || isCompany) && (
          <>
            <ControlledInput
              name="entityName"
              variant="text"
              maxLength={60}
              isAnimatedLabel
              autoCapitalize="none"
              style={styles.input}
              label={`Наименование${isIndividual ? ' ИП' : ''}`}
              hint={errors.entityName?.message}
              isError={!!errors.entityName?.message}
              onSubmitEditing={() => setFocus('ITIN')}
            />
            <Spacer size="l" />
          </>
        )}
        <ControlledInput
          name="ITIN"
          label="ИНН"
          variant="text"
          maxLength={12}
          isAnimatedLabel
          autoCapitalize="none"
          style={styles.input}
          keyboardType="number-pad"
          hint={errors.ITIN?.message}
          isError={!!errors.ITIN?.message}
          onSubmitEditing={isCompany ? () => setFocus('RRC') : undefined}
        />
        {isCompany && (
          <>
            <Spacer size="l" />
            <ControlledInput
              name="RRC"
              label="КПП"
              variant="text"
              maxLength={9}
              isAnimatedLabel
              autoCapitalize="none"
              style={styles.input}
              keyboardType="number-pad"
              hint={errors.RRC?.message}
              isError={!!errors.RRC?.message}
            />
          </>
        )}
        {(isIndividual || isCompany) && (
          <View style={styles.payerContainer}>
            <NDSPayerTooltip />
            <CheckBox
              checked={!!field.value}
              onPress={() => field.onChange(!field.value)}
            />
          </View>
        )}
        <Spacer size="xl" />
        <Button
          label="Сохранить"
          isPending={isLoading}
          style={styles.btn}
          onPress={handleSubmit(onSave)}
        />
      </FormProvider>
    </>
  );
};

export default DataEditingStep;
