import React, { useState } from 'react';
import { View } from 'react-native';

import { BottomSheet, Button, Spacer, useTheme } from 'rn-ui-kit';

import LogoutIcon from '@/assets/icons/svg/screens/LogoutIcon';
import { storageMMKV } from '@/mmkv/storage';
import { useAppDispatch } from '@/store';
import { logOut } from '@/store/slices/auth/actions';

import styles from './style';

const AccountTab = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onOpenModal = () => setIsVisible(true);
  const onCloseModal = () => setIsVisible(false);
  const onExit = () => {
    onCloseModal();
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  return (
    <>
      <Button
        variant="ghost"
        label="Выйти"
        style={styles.btn}
        onPress={onOpenModal}
        labelStyle={styles.btnLabel}
        icon={<LogoutIcon fill={theme.icons.basic} />}
      />
      <View
        style={[
          styles.line,
          { backgroundColor: theme.background.neutralDisableSecond },
        ]}
      />
      <BottomSheet
        isVisible={isVisible}
        titleStyle={styles.modalTitle}
        onBackdropPress={onCloseModal}
        onSwipeComplete={onCloseModal}
        title="Вы уверены, что хотите выйти из своего профиля?"
      >
        <Spacer size="xxl" />
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
    </>
  );
};

export default AccountTab;
