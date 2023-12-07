import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { useTaskMembers } from '@/hooks/useTaskMembers';
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
import { PostITTaskMemberParams } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { User } from '@/store/api/user/types';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ContractorsInvitationScreenNavigationProp } from '@/types/navigation';
import { ContractorStatus, TaskType } from '@/types/task';
import { getInitServices } from '@/utils/getInitServices';

type UseContractorsParams = {
  taskId: number;
  navigation: ContractorsInvitationScreenNavigationProp;
};

const useContractors = ({ taskId, navigation }: UseContractorsParams) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const {
    task,
    curator,
    userID,
    curatorMemberId,
    isInvitedCurator,
    isConfirmedCurator,
  } = useTaskMembers(taskId);
  const isItLots = task?.subsetID === TaskType.IT_AUCTION_SALE;

  const {
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetUserQuery(userID, {
    skip: !userID,
  });
  const {
    data: offersData,
    error: offerError,
    isError: isOfferError,
  } = useGetUserOffersQuery(
    {
      taskID: taskId,
      userID: userID as number,
    },
    { skip: !isItLots || !userID },
  );
  const {
    data: contractors,
    isLoading: isContractorsLoading,
    isError: isContractorsError,
    error: contractorsError,
    refetch,
  } = useGetAvailableContractorsQuery(
    {
      curatorId: userID as number,
      taskId,
    },
    {
      skip: !userID || !taskId,
    },
  );
  const [
    inviteContractors,
    { isSuccess: isInvitationSuccess, isLoading: isInvitationLoading },
  ] = usePostITTaskMemberMutation();
  const [addCurator] = usePatchITTaskMemberMutation();
  const [linkContractorsToCuratorOffer] = usePostITMembersOfferMutation();

  const [selectedContractorIDs, setSelectedContractorIDs] = useState<number[]>(
    [],
  );

  const error = contractorsError || offerError || userError;
  const isError = isContractorsError || isOfferError || isUserError;

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

    if (!user?.isApproved) {
      toast.show({
        type: 'error',
        title: 'Ваша учетная запись не подтверждена координатором',
      });

      return setSelectedContractorIDs(
        contractors
          ?.filter(
            contractor => contractor.subStatusID !== ContractorStatus.AVAILABLE,
          )
          .map(item => item.ID) as number[],
      );
    }

    const members = selectedContractorIDs.map(id => ({
      userID: id,
    })) as PostITTaskMemberParams['members'];

    try {
      // делаем отдельно patch куратора, если он приглашен координатором
      if (isInvitedCurator && curatorMemberId) {
        await inviteContractors({
          taskID: taskId,
          members,
        }).unwrap();

        if (!isItLots && !isConfirmedCurator) {
          await addCurator({
            ID: curatorMemberId,
            userID,
            isCurator: true,
            isConfirm: true,
          }).unwrap();
        }
      } else {
        await inviteContractors({
          taskID: taskId,
          members:
            isItLots || isConfirmedCurator
              ? members
              : members.concat([
                  {
                    userID,
                    isCurator: true,
                    isConfirm: true,
                  },
                ]),
        }).unwrap();

        if (isItLots && offer?.ID && userID) {
          await linkContractorsToCuratorOffer({
            curatorID: userID,
            executorIDs: (curator?.invitedIDs || []).concat(
              members.map(contractor => contractor.userID) as number[],
            ),
            offerID: offer.ID,
            isConfirm: true,
          }).unwrap();
        }
      }
    } catch (err) {
      toast.show({
        type: 'error',
        title: (err as AxiosQueryErrorResponse).data.message,
      });
    } finally {
      refetch();
    }
  };

  // навигация на скрин редактирования сметы в случае, если это куратор в ит лотах
  const customGoBack = () => {
    if (task?.services && offer) {
      const initServices = getInitServices(offer, task.services);
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
