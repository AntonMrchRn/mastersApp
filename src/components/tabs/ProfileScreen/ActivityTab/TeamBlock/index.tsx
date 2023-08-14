import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import MegaphoneIcon from '@/assets/icons/svg/screens/MegaphoneIcon';
import VectorIcon from '@/assets/icons/svg/screens/Vector';
import Title from '@/components/tabs/ProfileScreen/Title';
import UserInfoBlock from '@/components/tabs/ProfileScreen/UserInfoBlock';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useGetUserQuery, useGetUsersQuery } from '@/store/api/user';
import { User } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ContractorsInvitationScreenNavigationProp } from '@/types/navigation';

import styles from './style';

type TeamBlockProps = {
  curatorId: number | null;
  subcontractorIDs: number[];
};

const TeamBlock = ({ subcontractorIDs, curatorId }: TeamBlockProps) => {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation<ContractorsInvitationScreenNavigationProp>();
  const {
    data: contractors,
    isLoading: isContractorsLoading,
    isError: isContractorsError,
    error: contractorsError,
  } = useGetUsersQuery(subcontractorIDs, {
    skip: !subcontractorIDs.length,
  });

  const {
    data: curator,
    isLoading: isCuratorLoading,
    isError: isCuratorError,
    error: curatorError,
  } = useGetUserQuery(curatorId, {
    skip: !curatorId,
  });

  useEffect(() => {
    if (isContractorsError || isCuratorError) {
      toast.show({
        type: 'error',
        title: ((contractorsError || curatorError) as AxiosQueryErrorResponse)
          .data.message,
      });
    }
  }, [isContractorsError, isCuratorError]);

  const isCuratorNameExist = !!curator?.name && !!curator?.sname;

  const navigateToContractorsInvitation = () => {
    navigation.navigate(ProfileScreenName.ContractorsInvitation);
  };

  const navigateToTeamMemberDetails = (id: number, isContractor: boolean) => {
    navigation.navigate(ProfileScreenName.TeamMemberDetails, {
      contractorIDs: subcontractorIDs,
      teamMemberId: id,
      isContractor,
    });
  };

  const keyExtractor = (item: User) => `${item.ID}`;
  const renderItem = ({ item: contractor }: ListRenderItemInfo<User>) => (
    <UserInfoBlock
      isPressable
      info={
        !!contractor.name && !!contractor.sname
          ? `${contractor.name} ${contractor.sname}`
          : 'Анонимный пользователь'
      }
      onPress={() => navigateToTeamMemberDetails(contractor.ID, true)}
    />
  );

  const ListEmptyComponent = (
    <View style={styles.contractors}>
      <MegaphoneIcon fill={theme.icons.neutralDisable} />
      <Text
        variant="bodySRegular"
        color={theme.text.neutral}
        style={styles.defaultText}
      >
        Отправьте приглашение исполнителю и вы сможете выполнять задачи в роли
        его куратора
      </Text>
    </View>
  );

  const renderCurator = () => {
    if (isCuratorLoading) {
      return <ActivityIndicator />;
    }

    if (curatorId && curator) {
      return (
        <UserInfoBlock
          isPressable
          info={
            isCuratorNameExist
              ? `${curator.name} ${curator.sname}`
              : 'Анонимный пользователь'
          }
          onPress={() => navigateToTeamMemberDetails(curator.ID, false)}
        />
      );
    }

    return (
      <View style={styles.curatorsDefault}>
        <VectorIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          У вас пока нет кураторов
        </Text>
      </View>
    );
  };

  return (
    <>
      <Text variant="title3">Команда</Text>
      <Spacer size="xl" />
      <Title
        icon
        withButton
        title="Подрядчики"
        buttonLabel="Пригласить"
        titleStyle={styles.teamTitle}
        onPress={navigateToContractorsInvitation}
      />
      <Spacer size={subcontractorIDs?.length ? 'xs' : 'l'} />
      {isContractorsLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={subcontractorIDs.length ? contractors : []}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      <Spacer size="xl" />
      <Title title="Кураторы" titleStyle={styles.teamTitle} />
      <Spacer size={curatorId && curator ? 'xs' : 'l'} />
      {/*// TODO here should be an array of curators when the BE is ready*/}
      {renderCurator()}
    </>
  );
};

export default TeamBlock;
