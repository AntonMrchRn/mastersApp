import React, { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CheckMeasureIcon } from '@/assets/icons/svg/estimate/CheckMeasureIcon';
import { ModalStep } from '@/components/tabs/ProfileScreen/PaymentTab/EntityTypeModal/index';
import { useGetEntityTypesQuery } from '@/store/api/user';
import { EntityType } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';

import styles from './style';

type TypeSelectionStepProps = {
  setModalStep: (step: ModalStep) => void;
  setSelectedType: (type: EntityType) => void;
  selectedType?: EntityType;
};

const TypeSelectionStep = ({
  setModalStep,
  selectedType,
  setSelectedType,
}: TypeSelectionStepProps) => {
  const theme = useTheme();
  const toast = useToast();

  const {
    data: entityTypes,
    isError,
    error,
    isLoading,
  } = useGetEntityTypesQuery();

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  const onSelect = () => setModalStep(ModalStep.DataEditing);
  const onTypeSelect = (type: EntityType) => setSelectedType(type);

  return (
    <>
      {isLoading || !entityTypes ? (
        <>
          <Spacer />
          <ActivityIndicator size="large" color={theme.background.accent} />
        </>
      ) : (
        entityTypes?.map(type => (
          <TouchableOpacity
            key={type.ID}
            onPress={() =>
              onTypeSelect({
                ID: type.ID,
                description: type.description,
              })
            }
          >
            <View style={styles.entityType}>
              <Text variant="bodyMRegular">{type.description}</Text>
              {selectedType?.description === type.description && (
                <CheckMeasureIcon fill={theme.icons.accent} />
              )}
            </View>
            <Spacer
              separator="bottom"
              separatorColor={theme.background.neutralDisableSecond}
            />
          </TouchableOpacity>
        ))
      )}
      <Spacer size="xl" />
      <Button label="Выбрать" onPress={onSelect} disabled={!selectedType} />
    </>
  );
};

export default TypeSelectionStep;
