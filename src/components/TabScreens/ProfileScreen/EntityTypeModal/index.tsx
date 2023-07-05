import React, { useEffect, useState } from 'react';

import { BottomSheet, Spacer } from 'rn-ui-kit';

import DataEditingStep from '@/components/TabScreens/ProfileScreen/EntityTypeModal/DataEditingStep';
import TypeSelectionStep from '@/components/TabScreens/ProfileScreen/EntityTypeModal/TypeSelectionStep';
import { configApp } from '@/constants/platform';
import { useKeyboard } from '@/hooks/useKeyboard';
import { User } from '@/store/api/user/types';
import { UserEntityType } from '@/types/user';

import styles from './style';

export enum ModalStep {
  TypeSelection = 'TypeSelection',
  DataEditing = 'DataEditing',
}

export type Type = {
  id: number;
  description: UserEntityType;
};

type EntityTypeModalProps = {
  isVisible: boolean;
  onCloseModal: () => void;
  typeValues: Pick<User, 'ID' | 'ITIN' | 'RRC' | 'entityName' | 'isNDSPayer'>;
  type?: Type;
};

const EntityTypeModal = ({
  type,
  isVisible,
  typeValues,
  onCloseModal,
}: EntityTypeModalProps) => {
  const isKeyboardVisible = useKeyboard();

  const [modalStep, setModalStep] = useState<ModalStep | undefined>(
    ModalStep.TypeSelection
  );
  const [selectedType, setSelectedType] = useState<Type | undefined>(type);

  useEffect(() => {
    if (isVisible) {
      setModalStep(ModalStep.TypeSelection);
    }

    if (!isVisible) {
      setSelectedType(type);
    }

    if (!isVisible && modalStep === ModalStep.DataEditing) {
      setModalStep(undefined);
    }
  }, [isVisible]);

  const modalSteps = {
    [ModalStep.TypeSelection]: (
      <TypeSelectionStep
        setModalStep={setModalStep}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    ),
    [ModalStep.DataEditing]: selectedType && (
      <DataEditingStep
        selectedType={selectedType}
        typeValues={typeValues}
        onCloseModal={onCloseModal}
      />
    ),
  };

  return (
    <BottomSheet
      closeIcon
      avoidKeyboard
      isVisible={isVisible && !!modalStep}
      closeIconPress={onCloseModal}
      onBackdropPress={onCloseModal}
      onSwipeComplete={onCloseModal}
      titleStyle={styles.modalTitle}
      backdropTransitionOutTiming={0}
      closeIconContainerStyle={styles.closeIcon}
      containerStyle={configApp.ios && isKeyboardVisible && styles.pb10}
      title={
        modalStep === ModalStep.TypeSelection
          ? 'Правовая форма'
          : selectedType?.description
      }
    >
      <>
        {modalStep && modalSteps[modalStep]}
        <Spacer size={configApp.ios ? 'xs' : 'xl'} />
      </>
    </BottomSheet>
  );
};

export default EntityTypeModal;
