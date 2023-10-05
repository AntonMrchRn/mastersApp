import React, { useRef, useState } from 'react';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Spacer } from 'rn-ui-kit';

import ActivitiesModal from '@/components/tabs/ProfileScreen/ActivityTab/Modals/ActivitiesModal';
import RegionsModal from '@/components/tabs/ProfileScreen/ActivityTab/Modals/RegionsModal';
import SpecialityModal from '@/components/tabs/ProfileScreen/ActivityTab/Modals/SpecialityModal';
import TeamBlock from '@/components/tabs/ProfileScreen/ActivityTab/TeamBlock';
import useActivities from '@/components/tabs/ProfileScreen/ActivityTab/useActivities';
import useRegions from '@/components/tabs/ProfileScreen/ActivityTab/useRegions';
import Title from '@/components/tabs/ProfileScreen/Title';
import UserInfoBlock from '@/components/tabs/ProfileScreen/UserInfoBlock';
import { User } from '@/store/api/user/types';

type ActivityTabProps = {
  user: User;
  isTeamVisible: boolean;
};

const ActivityTab = ({ user, isTeamVisible }: ActivityTabProps) => {
  const ref = useRef<BottomSheetModalMethods>(null);
  const { activities, convertedActivities, isActivitiesLoading } =
    useActivities(user.setIDs);
  const { regions, convertedRegions, isRegionsLoading } = useRegions(
    user.regionIDs,
  );

  const [isActivitiesModalVisible, setIsActivitiesModalVisible] =
    useState<boolean>(false);
  const [isSpecialityModalVisible, setIsSpecialityModalVisible] =
    useState<boolean>(false);

  const onActivitiesModal = () =>
    setIsActivitiesModalVisible(!isActivitiesModalVisible);
  const onSpecialityModal = () =>
    setIsSpecialityModalVisible(!isSpecialityModalVisible);
  const onOpenRegionsModal = () => ref.current?.present();
  const onCloseRegionsModal = () => ref.current?.close();

  return (
    <>
      <Title title="Основная информация" />
      <Spacer />
      <UserInfoBlock
        isPressable
        onPress={onActivitiesModal}
        isLoading={isActivitiesLoading}
        iconType={convertedActivities ? 'arrow' : 'plus'}
        info={convertedActivities || 'Добавить направление'}
        label={convertedActivities ? 'Направление' : undefined}
      />
      <UserInfoBlock
        isPressable
        onPress={onOpenRegionsModal}
        isLoading={isRegionsLoading}
        info={convertedRegions || 'Добавить регион'}
        iconType={convertedRegions ? 'arrow' : 'plus'}
        label={convertedRegions ? 'Регион' : undefined}
      />
      <Spacer size="xxxl" />
      <Title title="Дополнительно" />
      <Spacer />
      <UserInfoBlock
        isPressable
        onPress={onSpecialityModal}
        iconType={user.specialty ? 'arrow' : 'plus'}
        info={user.specialty || 'Указать специализацию'}
        label={user.specialty ? 'Специализация' : undefined}
      />
      <Spacer size="xxxl" />
      {isTeamVisible && (
        <TeamBlock
          curatorId={user.curatorID}
          subcontractorIDs={user.subcontractorIDs}
        />
      )}
      {activities && (
        <ActivitiesModal
          userId={user.ID}
          activities={activities}
          onClose={onActivitiesModal}
          userActivityIDs={user.setIDs}
          isVisible={isActivitiesModalVisible}
        />
      )}
      {regions && (
        <RegionsModal
          ref={ref}
          userId={user.ID}
          regions={regions}
          onClose={onCloseRegionsModal}
          userRegionIDs={user.regionIDs}
        />
      )}
      <SpecialityModal
        userId={user.ID}
        onClose={onSpecialityModal}
        userSpeciality={user?.specialty}
        isVisible={isSpecialityModalVisible}
      />
    </>
  );
};

export default ActivityTab;
