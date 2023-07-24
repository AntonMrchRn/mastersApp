import React, { useEffect, useState } from 'react';

import { BottomSheet, Spacer } from 'rn-ui-kit';

import DataEditingStep from '@/components/tabs/ProfileScreen/PaymentTab/EntityTypeModal/DataEditingStep';
import TypeSelectionStep from '@/components/tabs/ProfileScreen/PaymentTab/EntityTypeModal/TypeSelectionStep';
import { configApp } from '@/constants/platform';
import { useKeyboard } from '@/hooks/useKeyboard';
import { EntityType, User } from '@/store/api/user/types';

import styles from './style';

export enum ModalStep {
  TypeSelection = 'TypeSelection',
  DataEditing = 'DataEditing',
}

type EntityTypeModalProps = {
  isVisible: boolean;
  isApproved: boolean;
  onCloseModal: () => void;
  typeValues: Pick<User, 'ID' | 'ITIN' | 'RRC' | 'entityName' | 'isNDSPayer'>;
  type?: EntityType;
};

const EntityTypeModal = ({
  type,
  isVisible,
  isApproved,
  typeValues,
  onCloseModal,
}: EntityTypeModalProps) => {
  const isKeyboardVisible = useKeyboard();

  const [modalStep, setModalStep] = useState<ModalStep | undefined>();
  const [selectedType, setSelectedType] = useState<EntityType | undefined>(
    type
  );

  useEffect(() => {
    setSelectedType(type);
  }, [type?.description]);

  useEffect(() => {
    if (isVisible) {
      setModalStep(
        isApproved ? ModalStep.DataEditing : ModalStep.TypeSelection
      );
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
        isApproved={isApproved}
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
