import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { AppScreenName } from '@/navigation/AppNavigation';
import { styles } from '@/screens/task/ContractorsScreen/style';
import { useAppDispatch } from '@/store';
import {
  useGetAvailableContractorsQuery,
  useGetUserOffersQuery,
  usePatchITTaskMemberMutation,
  usePostITMembersOfferMutation,
  usePostITTaskMemberMutation,
} from '@/store/api/tasks';
import { PostITTaskMemberParams, Service } from '@/store/api/tasks/types';
import { User } from '@/store/api/user/types';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ContractorsInvitationScreenNavigationProp } from '@/types/navigation';
import { ContractorStatus } from '@/types/task';
import { getInitServices } from '@/utils/getInitServices';

type UseContractorsParams = {
  taskId: number;
  curatorId: number;
  services?: Service[];
  isItLots?: boolean;
  curatorMemberId?: number;
  isInvitedCurator?: boolean;
  isConfirmedCurator?: boolean;
  navigation: ContractorsInvitationScreenNavigationProp;
};

const useContractors = ({
  taskId,
  services,
  isItLots,
  curatorId,
  navigation,
  curatorMemberId,
  isInvitedCurator,
  isConfirmedCurator,
}: UseContractorsParams) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const {
    data: offersData,
    error: offerError,
    isError: isOfferError,
  } = useGetUserOffersQuery(
    {
      taskID: taskId,
      userID: curatorId,
    },
    { skip: !isItLots || !curatorId },
  );
  const {
    data: contractors,
    isLoading: isContractorsLoading,
    isError: isContractorsError,
    error: contractorsError,
    refetch,
  } = useGetAvailableContractorsQuery(
    {
      curatorId,
      taskId,
    },
    {
      skip: !curatorId || !taskId,
    },
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
  const [addCurator, { isError: isCuratorError, error: curatorError }] =
    usePatchITTaskMemberMutation();
  const [
    linkContractorsToCuratorOffer,
    { isError: isMembersOfferError, error: membersOfferError },
  ] = usePostITMembersOfferMutation();

  const [selectedContractorIDs, setSelectedContractorIDs] = useState<number[]>(
    [],
  );

  const error =
    curatorError ||
    invitationError ||
    contractorsError ||
    membersOfferError ||
    offerError;
  const isError =
    isContractorsError ||
    isInvitationError ||
    isCuratorError ||
    isOfferError ||
    isMembersOfferError;

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isInvitationSuccess) {
      navigation.navigate(AppScreenName.TaskCard, {
        taskId,
      });
    }
  }, [isInvitationSuccess]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const offer = offersData?.offers[0];
  const isAvailableContractorsExist =
    !!contractors?.some(
      contractor => contractor.subStatusID === ContractorStatus.AVAILABLE,
    ) && !!contractors.length;
  const isAllContractorsAlreadyInvited = !!contractors?.every(
    contractor => contractor.subStatusID === ContractorStatus.ALREADY_INVITED,
  );

  const keyExtractor = (item: User) => `${item.ID}`;
  const navigateToProfile = () =>
    navigation.navigate(AppScreenName.ContractorsInvitation);

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

    const members = selectedContractorIDs.map(id => ({
      userID: id,
    })) as PostITTaskMemberParams['members'];

    // делаем отдельно patch куратора, если он приглашен координатором
    if (isInvitedCurator && curatorMemberId) {
      await inviteContractors({
        taskID: taskId,
        members,
      });

      if (!isItLots && !isConfirmedCurator) {
        await addCurator({
          ID: curatorMemberId,
          userID: curatorId,
          isCurator: true,
          isConfirm: true,
        });
      }
    } else {
      await inviteContractors({
        taskID: taskId,
        members:
          isItLots || isConfirmedCurator
            ? members
            : members.concat([
                {
                  userID: curatorId,
                  isCurator: true,
                  isConfirm: true,
                },
              ]),
      });

      if (isItLots && offer?.ID) {
        await linkContractorsToCuratorOffer({
          curatorID: curatorId,
          executorIDs: members.map(contractor => contractor.userID) as number[],
          offerID: offer.ID,
          isConfirm: true,
        });
      }
    }
  };

  // навигация на скрин редактирования сметы в случае, если это куратор в ит лотах
  const customGoBack = () => {
    if (services && offer) {
      const initServices = getInitServices(offer, services);
      dispatch(setOfferID(offer.ID));
      dispatch(setOfferComment(offer.comment));
      dispatch(setNewOfferServices(initServices));

      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId,
        isEdit: true,
        isSubmissionByCuratorItLots: true,
      });
    }
  };

  return {
    onSelect,
    contractors,
    keyExtractor,
    customGoBack,
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
