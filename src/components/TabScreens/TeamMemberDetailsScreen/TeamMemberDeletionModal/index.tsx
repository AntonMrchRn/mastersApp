import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, Modal, useToast } from 'rn-ui-kit';

import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useDeleteTeamMemberMutation } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ProfileScreenNavigationProp } from '@/types/navigation';

import styles from './style';

type TeamMemberDeletionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  isContractor: boolean;
  undeletedContractorIDs?: number[];
};

const TeamMemberDeletionModal = ({
  onClose,
  isVisible,
  isContractor,
  undeletedContractorIDs,
}: TeamMemberDeletionModalProps) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const toast = useToast();
  const [deleteTeamMember, { isError, isSuccess, error }] =
    useDeleteTeamMemberMutation();

  const onDelete = async () => {
    onClose();
    // kickSubs - удалить всех подрядчиков
    // subcontractorIDs - для удаления одного подрядчика, кидаем массив без этого подрядчика
    // kickCurator - удалить куратора
    await deleteTeamMember(
      isContractor
        ? undeletedContractorIDs?.length
          ? { subcontractorIDs: undeletedContractorIDs }
          : { kickSubs: true }
        : { kickCurator: true },
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileScreenName.Profile);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  return (
    <Modal
      closeIcon
      headerIcon="error"
      isVisible={isVisible}
      closeIconPress={onClose}
      onBackdropPress={onClose}
      title={
        isContractor
          ? 'Вы уверены, что хотите удалить данного подрядчика из своей команды?'
          : 'Прекратить сотрудничество с куратором?'
      }
      description={
        isContractor
          ? 'После этого вы не сможете курировать его работы'
          : 'После этого он не сможет приглашать вас на выполнение задач'
      }
      descriptionStyle={styles.description}
    >
      <View style={styles.btns}>
        <Button
          size="S"
          label="Отмена"
          onPress={onClose}
          style={styles.btn}
          variant="outlineAccent"
        />
        <Button
          size="S"
          variant="danger"
          style={styles.btn}
          onPress={onDelete}
          label={isContractor ? 'Удалить' : 'Прекратить'}
        />
      </View>
    </Modal>
  );
};

export default TeamMemberDeletionModal;
