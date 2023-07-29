import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Keychain from 'react-native-keychain';

import { useNavigation } from '@react-navigation/native';
import { Banner, Button, Spacer, useTheme, useToast } from 'rn-ui-kit';

import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import KeyIcon from '@/assets/icons/svg/screens/KeyIcon';
import LogoutIcon from '@/assets/icons/svg/screens/LogoutIcon';
import TelegramIcon from '@/assets/icons/svg/screens/TelegramIcon';
import AccountModal from '@/components/TabScreens/ProfileScreen/AccountTab/AccountModal';
import { storageMMKV } from '@/mmkv/storage';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppDispatch } from '@/store';
import { useDeleteAccountMutation } from '@/store/api/user';
import { logOut } from '@/store/slices/auth/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ProfileScreenNavigationProp } from '@/types/navigation';

import styles from './style';

type AccountTabProps = {
  onBanner: () => void;
  copyEmail: () => void;
  hasActiveTasks: boolean;
  isBannerVisible: boolean;
};

const AccountTab = ({
  onBanner,
  copyEmail,
  hasActiveTasks,
  isBannerVisible,
}: AccountTabProps) => {
  const theme = useTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [deleteAccount, { isSuccess, isError, error }] =
    useDeleteAccountMutation();

  const [isExitModalVisible, setIsExitModalVisible] = useState<boolean>(false);
  const [isDeletionModalVisible, setIsDeletionModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      onDeletionModal();
      clearData();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const onExitModal = () => setIsExitModalVisible(!isExitModalVisible);
  const onDeletionModal = () =>
    setIsDeletionModalVisible(!isDeletionModalVisible);

  const clearData = () => {
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  const onExit = () => {
    onExitModal();
    clearData();
  };

  const onDelete = async () => {
    if (hasActiveTasks) {
      onDeletionModal();
      onBanner();
      return;
    }

    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        await deleteAccount({
          login: credentials.username,
          password: credentials.password,
        });
      } else {
        toast.show({
          type: 'error',
          title: 'Не удалось удалить аккаунт. Повторите, пожалуйста, позже',
        });
        throw new Error('no credentials');
      }
    } catch (e) {
      console.log('onDelete getGenericPassword error: ', e);
    }
  };

  const navigateToChangePassword = () => {
    navigation.navigate(ProfileScreenName.ChangePassword);
  };

  const navigateToTelegramBot = () => {
    navigation.navigate(ProfileScreenName.TelegramBot);
  };

  return (
    <>
      <Button
        variant="ghost"
        label="Сменить пароль"
        style={styles.btn}
        onPress={navigateToChangePassword}
        labelStyle={styles.btnLabel}
        icon={<KeyIcon fill={theme.icons.basic} />}
      />
      <Button
        variant="ghost"
        style={styles.btn}
        label="Telegram-бот"
        onPress={navigateToTelegramBot}
        labelStyle={styles.btnLabel}
        icon={<TelegramIcon fill={theme.icons.basic} />}
      />
      <Button
        variant="ghost"
        style={styles.btn}
        label="Удалить аккаунт"
        onPress={onDeletionModal}
        labelStyle={styles.btnLabel}
        icon={<DeleteFileIcon fill={theme.icons.basic} />}
      />
      <Button
        label="Выйти"
        variant="ghost"
        style={styles.btn}
        onPress={onExitModal}
        labelStyle={styles.btnLabel}
        icon={<LogoutIcon fill={theme.icons.basic} />}
      />

      <View
        style={[
          styles.line,
          { backgroundColor: theme.background.neutralDisableSecond },
        ]}
      />
      <AccountModal
        modalType="exit"
        onPress={onExit}
        onClose={onExitModal}
        isVisible={isExitModalVisible}
      />
      <AccountModal
        onPress={onDelete}
        modalType="deletion"
        onClose={onDeletionModal}
        isVisible={isDeletionModalVisible}
      />
      {isBannerVisible && (
        <>
          <Spacer />
          <Banner
            icon="alert"
            type="warning"
            onClosePress={onBanner}
            containerStyle={{ marginTop: 'auto' }}
            title="Завершите активные задачи"
            buttonText="Скопировать адрес почты"
            onButtonPress={copyEmail}
            text="Если у вас есть незавершенные задачи, то удалить аккаунт можно только обратившись в службу поддержки info@mastera-service.ru"
          />
        </>
      )}
    </>
  );
};

export default AccountTab;
