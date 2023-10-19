import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getVersion } from 'react-native-device-info';

import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from 'rn-ui-kit';

import { DeleteFileIcon } from '@/assets/icons/svg/files/DeleteFileIcon';
import KeyIcon from '@/assets/icons/svg/screens/KeyIcon';
import LogoutIcon from '@/assets/icons/svg/screens/LogoutIcon';
import TelegramIcon from '@/assets/icons/svg/screens/TelegramIcon';
import ActionButton from '@/components/tabs/ProfileScreen/AccountTab/ActionButton';
import ExitModal from '@/components/tabs/ProfileScreen/AccountTab/ExitModal';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { ProfileScreenNavigationProp } from '@/types/navigation';

type AccountTabProps = {
  hasActiveTasks: boolean;
};

const AccountTab = ({ hasActiveTasks }: AccountTabProps) => {
  const theme = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onExitModal = () => setIsModalVisible(!isModalVisible);
  const navigateToChangePassword = () =>
    navigation.navigate(ProfileScreenName.ChangePassword);

  const navigateToTelegramBot = () =>
    navigation.navigate(ProfileScreenName.TelegramBot);

  const navigateToAccountDeletion = () =>
    navigation.navigate(ProfileScreenName.AccountDeletion, {
      hasActiveTasks,
    });

  const version = getVersion();

  const actions = {
    changePassword: {
      title: 'Сменить пароль',
      onPress: navigateToChangePassword,
      icon: <KeyIcon fill={theme.icons.basic} />,
    },
    connectToTelegramBot: {
      title: 'Telegram-бот',
      onPress: navigateToTelegramBot,
      icon: <TelegramIcon fill={theme.icons.basic} />,
    },
    deleteAccount: {
      title: 'Удалить аккаунт',
      onPress: navigateToAccountDeletion,
      icon: <DeleteFileIcon fill={theme.icons.basic} />,
    },
    exit: {
      title: 'Выйти',
      onPress: onExitModal,
      icon: <LogoutIcon fill={theme.icons.basic} />,
    },
  };

  return (
    <View>
      {Object.values(actions).map(action => (
        <ActionButton
          icon={action.icon}
          key={action.title}
          label={action.title}
          onPress={action.onPress}
        />
      ))}
      <Text
        variant="bodySRegular"
        color={theme.text.neutral}
        style={styles.text}
      >
        Версия приложения: {version}
      </Text>
      <ExitModal onClose={onExitModal} isVisible={isModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: { paddingTop: 20 },
});

export default AccountTab;
