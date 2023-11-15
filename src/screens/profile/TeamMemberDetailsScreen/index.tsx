import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { AvatarIcon } from '@/assets/icons/svg/screens/AvatarIcon';
import Header from '@/components/Header';
import UserInfoBlock from '@/components/tabs/ProfileScreen/UserInfoBlock';
import TeamMemberDeletionModal from '@/components/TabScreens/TeamMemberDetailsScreen/TeamMemberDeletionModal';
import useTeamMemberDetails from '@/screens/profile/TeamMemberDetailsScreen/useTeamMemberDetails';
import { convertPhone } from '@/utils/convertPhone';

import styles from './style';

const TeamMemberDetailsScreen = () => {
  const theme = useTheme();
  const {
    member,
    onModal,
    isLoading,
    isNameExist,
    isContractor,
    isModalVisible,
    convertedRegions,
    convertedActivities,
    undeletedContractorIDs,
    onPressEmail,
    onPressPhone,
  } = useTeamMemberDetails();

  return (
    <View style={styles.container}>
      <Header
        title={`Информация о ${isContractor ? 'подрядчике' : 'кураторе'}`}
      />
      <Spacer size="xl" />
      {(isLoading || !member) && <ActivityIndicator />}
      {member && (
        <ScrollView style={styles.content}>
          <View style={styles.avatarContainer}>
            <AvatarIcon size={52} />
            <Spacer horizontal />
            <View style={styles.nameContainer}>
              <Text variant="title2" style={styles.name}>
                {isNameExist
                  ? `${member.name} ${member.sname}`
                  : 'Анонимный пользователь'}
              </Text>
              <Spacer size="s" />
              <Text variant="captionRegular" color={theme.text.neutral}>
                ID: {member.ID}
              </Text>
            </View>
          </View>
          <Spacer size="xxxl" />
          <Text variant="title3">Деятельность</Text>
          <Spacer />
          <UserInfoBlock
            label="Направление"
            info={convertedActivities || 'Не указано'}
          />
          <UserInfoBlock
            label="Регион"
            info={convertedRegions || 'Не указано'}
          />
          <UserInfoBlock
            label="Специализация"
            info={member.specialty || 'Не указано'}
          />
          <Spacer size="xxxl" />
          <Text variant="title3">Контакты</Text>
          <Spacer />
          <UserInfoBlock
            onPress={onPressPhone}
            isPressable={!!member.phone}
            label="Телефон"
            info={member.phone ? convertPhone(member.phone) : 'Не указано'}
          />
          <UserInfoBlock
            label="Электронная почта"
            isPressable={!!member.email}
            onPress={onPressEmail}
            info={member.email || 'Не указано'}
          />
          <Spacer size="xl" />
          <Button
            onPress={onModal}
            variant="outlineDanger"
            style={styles.deleteBtn}
            label={
              isContractor
                ? 'Удалить из подрядчиков'
                : 'Прекратить сотрудничество'
            }
          />
          <Spacer />
          <TeamMemberDeletionModal
            onClose={onModal}
            isVisible={isModalVisible}
            isContractor={isContractor}
            undeletedContractorIDs={undeletedContractorIDs}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TeamMemberDetailsScreen;
