import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import MegaphoneIcon from '@/assets/icons/svg/screens/MegaphoneIcon';
import ActivitiesModal from '@/components/TabScreens/ProfileScreen/ActivityTab/Modals/ActivitiesModal';
import RegionsModal from '@/components/TabScreens/ProfileScreen/ActivityTab/Modals/RegionsModal';
import SpecialityModal from '@/components/TabScreens/ProfileScreen/ActivityTab/Modals/SpecialityModal';
import Title from '@/components/TabScreens/ProfileScreen/Title';
import UserInfoBlock from '@/components/TabScreens/ProfileScreen/UserInfoBlock';
import { useGetActivitiesQuery, useGetRegionsQuery } from '@/store/api/user';
import { User } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';

import styles from './style';

type ActivityTabProps = {
  user: User;
  isContractorsVisible: boolean;
};

const ActivityTab = ({ user, isContractorsVisible }: ActivityTabProps) => {
  const theme = useTheme();
  const toast = useToast();
  const ref = useRef<BottomSheetModalMethods>(null);

  const {
    activities,
    userActivities,
    activitiesError,
    isActivitiesError,
    isActivitiesLoading,
  } = useGetActivitiesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      activities: data,
      activitiesError: error,
      isActivitiesError: isError,
      isActivitiesLoading: isLoading,
      userActivities: data?.filter(activity =>
        user.setIDs.includes(activity.ID)
      ),
    }),
  });
  const {
    regions,
    userRegions,
    regionsError,
    isRegionsError,
    isRegionsLoading,
  } = useGetRegionsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      regions: data,
      regionsError: error,
      isRegionsError: isError,
      isRegionsLoading: isLoading,
      userRegions: data?.filter(region => user.regionIDs.includes(region.ID)),
    }),
  });

  useEffect(() => {
    if (isActivitiesError || isRegionsError) {
      toast.show({
        type: 'error',
        title: ((activitiesError || regionsError) as AxiosQueryErrorResponse)
          .data.message,
        contentHeight: 120,
      });
    }
  }, [isActivitiesError, isRegionsError]);

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

  const convertedActivities = userActivities?.reduce(
    (convertedActivities, activity, index, array) =>
      index !== array.length - 1
        ? `${activity.description}, `
        : `${convertedActivities}${activity.description}`,
    ''
  );
  const convertedRegions = userRegions?.reduce(
    (convertedRegions, region, index, array) =>
      array.length === 1
        ? array[0]?.name || ''
        : `${array[0]?.name}, + еще ${array.length - 1}`,
    ''
  );

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
      {isContractorsVisible && (
        <>
          <Title
            icon={true}
            title="Подрядчики"
            withButton={true}
            buttonLabel={'Пригласить'}
            onPress={() => Alert.alert('В работе')}
          />
          <Spacer size="xl" />
          <View style={styles.contractors}>
            <MegaphoneIcon fill={theme.icons.neutralDisable} />
            <Text
              variant="bodySRegular"
              color={theme.text.neutral}
              style={styles.defaultText}
            >
              Отправьте приглашение исполнителю и вы сможете выполнять задачи в
              роли его куратора
            </Text>
          </View>
        </>
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
