import React, { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CheckMarkIcon } from '@/assets/icons/svg/screens/CheckMarkIcon';
import {
  ModalStep,
  Type,
} from '@/components/TabScreens/ProfileScreen/EntityTypeModal/index';
import styles from '@/components/TabScreens/ProfileScreen/EntityTypeModal/style';
import { useGetEntityTypesQuery } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';

type TypeSelectionStepProps = {
  selectedType?: Type;
  setModalStep: (step: ModalStep) => void;
  setSelectedType: (type: Type) => void;
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
        title: (error as AxiosQueryErrorResponse)?.data?.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  const onSelect = () => setModalStep(ModalStep.DataEditing);
  const onTypeSelect = (type: Type) => setSelectedType(type);

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
                id: type.ID,
                description: type.description,
              })
            }
          >
            <View style={styles.entityType}>
              <Text variant="bodyMRegular">{type.description}</Text>
              {selectedType?.description === type.description && (
                <CheckMarkIcon fill={theme.icons.accent} />
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
      <Button
        label="Выбрать"
        onPress={onSelect}
        isPending={false}
        disabled={!selectedType}
      />
      <Spacer />
    </>
  );
};

export default TypeSelectionStep;
