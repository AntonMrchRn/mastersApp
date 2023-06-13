import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text } from 'rn-ui-kit';
import { useTheme } from 'rn-ui-kit';

import Logout from '@/assets/icons/svg/screens/Logout';
import UserInfoBlock from '@/components/TabScreens/ProfileScreen/UserInfoBlock';
import { storageMMKV } from '@/mmkv/storage';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetUserQuery } from '@/store/api/user';
import { logOut } from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { convertPhone } from '@/utils/convertPhone';

import styles from './style';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: usersData } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
    refetchOnFocus: true,
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const user = usersData?.users[0];
  const isNameExist = !!user?.name && !!user.sname;

  const onOpenModal = () => setIsVisible(true);
  const onCloseModal = () => setIsVisible(false);
  const onExit = () => {
    onCloseModal();
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="title1" style={styles.title}>
          {isNameExist ? `${user.name} ${user.sname}` : 'Профиль'}
        </Text>
        <Spacer size="xl" />
        {!!user?.phone && (
          <UserInfoBlock label="Телефон" info={convertPhone(user.phone)} />
        )}
        {!!user?.email && (
          <UserInfoBlock label="Адрес электронной почты" info={user?.email} />
        )}
        <Button
          onPress={onOpenModal}
          label="Выйти из профиля"
          labelStyle={{ color: theme.text.accent }}
          icon={<Logout fill={theme.stroke.accent} />}
          style={[
            styles.exitBtn,
            {
              backgroundColor: theme.background.main,
              borderColor: theme.stroke.accent,
            },
          ]}
        />
        <BottomSheet
          isVisible={isVisible}
          titleStyle={styles.modalTitle}
          onBackdropPress={onCloseModal}
          onSwipeComplete={onCloseModal}
          title="Вы уверены, что хотите выйти из своего профиля?"
        >
          <Spacer size="xl" />
          <Button
            label="Выйти"
            onPress={onExit}
            style={{ backgroundColor: theme.background.danger }}
          />
          <Spacer size="l" />
          <Button
            label="Отмена"
            onPress={onCloseModal}
            labelStyle={{ color: theme.text.accent }}
            style={[
              styles.cancelBtn,
              {
                backgroundColor: theme.background.main,
                borderColor: theme.stroke.accent,
              },
            ]}
          />
          <Spacer size="l" />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
