import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import { Banner, Button, Spacer, useTheme, useToast } from 'rn-ui-kit';

import PencilIcon from '@/assets/icons/svg/screens/PencilIcon';
import Title from '@/components/tabs/ProfileScreen/Title';
import UserInfoBlock from '@/components/tabs/ProfileScreen/UserInfoBlock';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppDispatch } from '@/store';
import { User } from '@/store/api/user/types';
import {
  setIsApprovalNotificationShown,
  setProfileEmailTimeout,
  setProfilePhoneTimeout,
} from '@/store/slices/user/actions';
import { CompositeEditingNavigationProp } from '@/types/navigation';
import { convertPhone } from '@/utils/convertPhone';

import { ContactUsBottomSheet } from './ContactUsBottomSheet';

import styles from './style';

type CommonTabProps = {
  user: User;
  onBlockingModalOpen: () => void;
  isApprovalNotificationVisible: boolean;
};

const CommonTab = ({
  user,
  onBlockingModalOpen,
  isApprovalNotificationVisible,
}: CommonTabProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CompositeEditingNavigationProp>();
  const toast = useToast();

  const [contactUsVisible, setContactUsVisible] = useState(false);
  const onOpenContactUs = () => setContactUsVisible(true);
  const onCloseContactUs = () => setContactUsVisible(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profilePhoneTimeout');
      const jsonValueEmail = await AsyncStorage.getItem('profileEmailTimeout');

      jsonValue && dispatch(setProfilePhoneTimeout(JSON.parse(jsonValue)));
      jsonValueEmail &&
        dispatch(setProfileEmailTimeout(JSON.parse(jsonValueEmail)));
    } catch (e) {
      console.log(`getData value reading error: ${e}`);
    }
  };

  const editEmail = () => {
    navigation.navigate(ProfileScreenName.EmailEditing, {
      email: user?.email,
    });
  };

  const editPhone = () => {
    navigation.navigate(ProfileScreenName.PhoneEditing, {
      phone: user?.phone ? `${user?.phone}`.substring(1) : null,
    });
  };

  const onEdit = () => {
    if (user.isApproved) {
      return onBlockingModalOpen();
    }
    navigation.navigate(ProfileScreenName.PersonalDataEditing, {
      name: user.name,
      sname: user.sname,
      pname: user.pname,
    });
  };
  const onCopy = () => {
    Clipboard.setString('info@mastera-service.ru');
    toast.show({
      type: 'success',
      title: 'Адрес почты скопирован',
    });
    onCloseContactUs();
  };

  return (
    <>
      <ContactUsBottomSheet
        isVisible={contactUsVisible}
        onClose={onCloseContactUs}
        onCopy={onCopy}
      />
      <Title
        withButton
        onPress={onEdit}
        buttonLabel="Изменить"
        title="Персональные данные"
        icon={<PencilIcon fill={theme.icons.basic} />}
      />
      <Spacer />
      <UserInfoBlock label="Фамилия" info={user?.sname || 'Не указано'} />
      <UserInfoBlock label="Имя" info={user?.name || 'Не указано'} />
      {!!user?.pname && (
        <UserInfoBlock label="Отчество" info={user?.pname || 'Не указано'} />
      )}
      <Spacer size="xxxl" />
      <Title title="Контакты" />
      <Spacer />
      {!!user?.phone && (
        <UserInfoBlock
          label="Телефон"
          isPressable
          onPress={editPhone}
          info={convertPhone(user.phone)}
        />
      )}
      {!!user?.email && (
        <UserInfoBlock
          isPressable
          info={user?.email}
          onPress={editEmail}
          label="Адрес электронной почты"
        />
      )}
      {!user?.phone && (
        <Button
          size="S"
          icon={true}
          variant="ghost"
          onPress={editPhone}
          style={styles.addBtn}
          label="Добавить телефон"
        />
      )}
      {!user?.email && (
        <Button
          size="S"
          icon={true}
          variant="ghost"
          onPress={editEmail}
          label="Добавить почту"
          style={styles.addBtn}
        />
      )}
      <Spacer size="xxxl" />
      <Title title="Помощь" />
      <Spacer />
      {/* <UserInfoBlock
        isPressable
        onPress={onQuestions}
        info="Часто задаваемые вопросы"
      /> */}
      <UserInfoBlock
        isPressable
        onPress={onOpenContactUs}
        info="Связаться с нами"
      />
      {isApprovalNotificationVisible && (
        <Banner
          type="success"
          icon="success"
          containerStyle={styles.banner}
          title="Учетная запись подтверждена"
          onClosePress={() => dispatch(setIsApprovalNotificationShown(true))}
          text="Данные успешно прошли проверку. Теперь вы можете выполнять задачи"
        />
      )}
    </>
  );
};

export default CommonTab;
