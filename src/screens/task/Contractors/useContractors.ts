import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToast } from 'rn-ui-kit';

import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { BottomTabName } from '@/navigation/TabNavigation';
import { styles } from '@/screens/task/Contractors/style';
import {
  useGetAvailableContractorsQuery,
  usePatchITTaskMemberMutation,
  usePostITTaskMemberMutation,
} from '@/store/api/tasks';
import { PostITTaskMemberParams } from '@/store/api/tasks/types';
import { User } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ProfileStackNavigationProp } from '@/types/navigation';
import { ContractorStatus } from '@/types/task';

const useContractors = (
  navigation: ProfileStackNavigationProp,
  taskId: number,
  curatorId: number,
  isInvitedCurator: boolean,
  curatorMemberId?: number
) => {
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const {
    data: contractors,
    isLoading: isContractorsLoading,
    isError: isContractorsError,
    error: contractorsError,
  } = useGetAvailableContractorsQuery(
    {
      curatorId,
      taskId,
    },
    {
      skip: !curatorId || !taskId,
    }
  );

  const [
    inviteContractors,
    {
      isError: isInvitationError,
      isSuccess: isInvitationSuccess,
      isLoading: isInvitationLoading,
      error: invitationError,
    },
  ] = usePostITTaskMemberMutation();
  const [
    addCurator,
    {
      isError: isCuratorError,
      isSuccess: isCuratorSuccess,
      error: curatorError,
    },
  ] = usePatchITTaskMemberMutation();

  const [selectedContractorIDs, setSelectedContractorIDs] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (isInvitationSuccess) {
      navigation.goBack();
    }
  }, [isInvitationSuccess]);

  useEffect(() => {
    if (isContractorsError || isInvitationError || isCuratorError) {
      toast.show({
        type: 'error',
        title: (
          (contractorsError ||
            invitationError ||
            curatorError) as AxiosQueryErrorResponse
        ).data.message,
      });
    }
  }, [isContractorsError, isInvitationError, isCuratorError]);

  const isAvailableContractorsExist =
    !!contractors?.some(
      contractor => contractor.subStatusID === ContractorStatus.AVAILABLE
    ) && !!contractors.length;

  const isAllContractorsAlreadyInvited = !!contractors?.every(
    contractor => contractor.subStatusID === ContractorStatus.ALREADY_INVITED
  );

  const keyExtractor = (item: User) => `${item.ID}`;
  const navigateToProfile = () => {
    navigation.navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.ContractorsInvitation,
    });
  };

  const onSelectContractor = (id: number) => {
    const isSelected = selectedContractorIDs.includes(id);
    const updatedSelectedValues = isSelected
      ? selectedContractorIDs.filter(contractorId => contractorId !== id)
      : selectedContractorIDs.concat(id);
    setSelectedContractorIDs(updatedSelectedValues);
  };

  const onSelect = async () => {
    if (!selectedContractorIDs.length) {
      return toast.show({
        type: 'error',
        titleStyle: styles.toastTitle,
        containerStyle: { height: 75 + insets.top },
        title: 'Необходимо выбрать хотя бы одного подрядчика из списка',
      });
    }

    // делаем отдельно patch куратора, если он приглашен координатором
    if (isInvitedCurator && curatorMemberId) {
      await inviteContractors({
        taskID: taskId,
        members: selectedContractorIDs.map(id => ({
          userID: id,
        })) as PostITTaskMemberParams['members'],
      });

      await addCurator({
        ID: curatorMemberId,
        userID: curatorId,
        isCurator: true,
        isConfirm: true,
      });
    } else {
      await inviteContractors({
        taskID: taskId,
        members: (
          selectedContractorIDs.map(id => ({
            userID: id,
          })) as PostITTaskMemberParams['members']
        ).concat([
          {
            userID: curatorId,
            isCurator: true,
            isConfirm: true,
          },
        ]),
      });
    }
  };

  return {
    onSelect,
    contractors,
    keyExtractor,
    navigateToProfile,
    onSelectContractor,
    isInvitationLoading,
    selectedContractorIDs,
    isContractorsLoading,
    isAvailableContractorsExist,
    isAllContractorsAlreadyInvited,
  };
};

export default useContractors;
