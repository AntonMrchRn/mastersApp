import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { useIsFocused, useRoute } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import useActivities from '@/components/tabs/ProfileScreen/ActivityTab/useActivities';
import useRegions from '@/components/tabs/ProfileScreen/ActivityTab/useRegions';
import { useGetUserQuery } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';
import { TeamMemberDetailsScreenRoute } from '@/types/navigation';

const useTeamMemberDetails = () => {
  const toast = useToast();
  const isFocused = useIsFocused();

  const { params } = useRoute<TeamMemberDetailsScreenRoute>();

  const {
    data: member,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetUserQuery(params.teamMemberId, {
    skip: !params.teamMemberId,
  });
  const { convertedActivities } = useActivities(member?.setIDs);
  const { convertedRegions } = useRegions(member?.regionIDs, true);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const isNameExist = !!member?.name && !!member?.sname;

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const onModal = () => setIsModalVisible(!isModalVisible);

  const undeletedContractorIDs = params.contractorIDs.filter(
    id => id !== member?.ID,
  );
  const onPressEmail = async () => {
    if (member?.email) {
      const emailLink = 'mailto:' + member?.email;
      if (await Linking.canOpenURL(emailLink)) {
        Linking.openURL(emailLink);
      }
    }
  };
  const onPressPhone = async () => {
    if (member?.phone) {
      const phoneLink = 'tel:' + member?.phone;
      if (await Linking.canOpenURL(phoneLink)) {
        Linking.openURL(phoneLink);
      }
    }
  };
  return {
    member,
    onModal,
    isLoading,
    isNameExist,
    isModalVisible,
    convertedRegions,
    convertedActivities,
    undeletedContractorIDs,
    isContractor: params.isContractor,
    onPressEmail,
    onPressPhone,
  };
};

export default useTeamMemberDetails;
