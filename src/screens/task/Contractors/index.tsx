import React from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Banner, Button, Spacer, Text } from 'rn-ui-kit';

import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import Contractor from '@/components/TabScreens/ContractorsScreen/Contractor';
import useContractors from '@/screens/task/Contractors/useContractors';
import { User } from '@/store/api/user/types';
import {
  ContractorsInvitationScreenNavigationProp,
  ContractorsScreenRoute,
} from '@/types/navigation';

import { styles } from './style';

export const ContractorsScreen = ({
  route: {
    params: {
      taskId,
      isItLots,
      curatorId,
      curatorMemberId,
      isInvitedCurator,
      isConfirmedCurator,
    },
  },
  navigation,
}: {
  navigation: ContractorsInvitationScreenNavigationProp;
  route: ContractorsScreenRoute;
}) => {
  const {
    onSelect,
    contractors,
    keyExtractor,
    navigateToProfile,
    onSelectContractor,
    isInvitationLoading,
    isContractorsLoading,
    selectedContractorIDs,
    isAvailableContractorsExist,
    isAllContractorsAlreadyInvited,
  } = useContractors({
    navigation,
    taskId,
    curatorId,
    isInvitedCurator,
    curatorMemberId,
    isItLots,
    isConfirmedCurator,
  });

  const renderItem = ({ item: contractor }: ListRenderItemInfo<User>) => (
    <Contractor
      contractor={contractor}
      onSelect={() => onSelectContractor(contractor.ID)}
      isSelected={selectedContractorIDs.includes(contractor.ID)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Spacer size="xl" />
      {!!contractors?.length && (
        <Text variant="title3">Выберите подрядчика</Text>
      )}
      <Spacer size="xl" />
      {isContractorsLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          scrollEnabled
          data={contractors}
          style={styles.contractors}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contractorsContainer}
          ListEmptyComponent={
            <PreviewNotFound type={PreviewNotFoundType.NoContractors} />
          }
        />
      )}
      {!isAvailableContractorsExist && !!contractors?.length && (
        <>
          <Banner
            type="error"
            icon="alert"
            title="Нет доступных подрядчиков"
            text={`К сожалению, ${
              isAllContractorsAlreadyInvited
                ? 'вам некого пригласить для выполнения этой задачи'
                : 'вы не можете принять участие в этой задаче'
            }`}
          />
          <Spacer size="l" />
        </>
      )}
      {!!contractors?.length && (
        <Button
          label="Выбрать"
          style={styles.btn}
          onPress={onSelect}
          isPending={isInvitationLoading}
          disabled={!isAvailableContractorsExist}
        />
      )}
      {!contractors?.length && !isContractorsLoading && (
        <Button
          icon
          style={styles.btn}
          label="Пригласить подрядчика"
          onPress={navigateToProfile}
        />
      )}
      <Spacer />
    </SafeAreaView>
  );
};

export default ContractorsScreen;
