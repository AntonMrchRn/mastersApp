import React, { useEffect } from 'react';
import {
  FormProvider,
  Resolver,
  useController,
  useForm,
} from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CheckBox, Spacer, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import NDSPayerTooltip from '@/components/tabs/ProfileScreen/NDSPayerTooltip';
import { useEditUserMutation } from '@/store/api/user';
import { EntityType, User } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';
import { EntityTypeFormValues } from '@/types/form';
import { UserEntityType } from '@/types/user';
import {
  companyEntityValidationSchema,
  entityNameValidationSchema,
  individualEntityValidationSchema,
  selfEmployedEntityValidationSchema,
} from '@/utils/formValidation';

import styles from './style';

type TypeSelectionStepProps = {
  isApproved: boolean;
  selectedType: EntityType;
  onCloseModal: () => void;
  typeValues: Pick<User, 'ID' | 'ITIN' | 'RRC' | 'entityName' | 'isNDSPayer'>;
};

const DataEditingStep = ({
  isApproved,
  selectedType,
  typeValues,
  onCloseModal,
}: TypeSelectionStepProps) => {
  const toast = useToast();
  const [editEntityType, { isError, error, isLoading, isSuccess }] =
    useEditUserMutation();

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
      onCloseModal();
    }
  }, [isSuccess]);

  const { ID, description } = selectedType;
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
    defaultValues: isApproved
      ? defaultEntityName
      : formProps[description].defaultValues,
    resolver: (isApproved
      ? yupResolver(entityNameValidationSchema)
      : yupResolver(
          formProps[description].validationSchema
        )) as Resolver<EntityTypeFormValues>,
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
    if (isCompany && ITIN?.length === 12 && isDirty) {
      setFocus('RRC');
    }
  }, [ITIN]);

  useEffect(() => {
    if (isCompany && RRC && RRC?.length === 9 && isDirty) {
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
      ...(isApproved && { entityName }),
      ...(!isApproved && { entityTypeId: ID, ...params[description] }),
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
        {!isApproved && (
          <ControlledInput
            name="ITIN"
            label="ИНН"
            variant="text"
            maxLength={isCompany ? 10 : 12}
            isAnimatedLabel
            autoCapitalize="none"
            style={styles.input}
            keyboardType="number-pad"
            hint={errors.ITIN?.message}
            isError={!!errors.ITIN?.message}
            onSubmitEditing={isCompany ? () => setFocus('RRC') : undefined}
          />
        )}
        {isCompany && !isApproved && (
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
        {(isIndividual || isCompany) && !isApproved && (
          <View style={styles.payerContainer}>
            <NDSPayerTooltip />
            <CheckBox
              checked={!!field.value}
              onPress={() => field.onChange(!field.value)}
            />
          </View>
        )}
        {!isApproved && <Spacer size="xl" />}
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
