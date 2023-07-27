import { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import useActivities from '@/components/tabs/ProfileScreen/ActivityTab/useActivities';
import useRegions from '@/components/tabs/ProfileScreen/ActivityTab/useRegions';
import { useGetUserQuery } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';
import { TeamMemberDetailsScreenRoute } from '@/types/navigation';

const useTeamMemberDetails = () => {
  const toast = useToast();
  const { params } = useRoute<TeamMemberDetailsScreenRoute>();

  const {
    data: member,
    isError,
    isLoading,
    error,
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

  const onModal = () => setIsModalVisible(!isModalVisible);

  const undeletedContractorIDs = params.contractorIDs.filter(
    id => id !== member?.ID
  );

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
  };
};

export default useTeamMemberDetails;
