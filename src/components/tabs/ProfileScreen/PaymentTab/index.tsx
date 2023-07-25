import React, { useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { CheckBox, Spacer, Text, useTheme } from 'rn-ui-kit';

import PencilIcon from '@/assets/icons/svg/screens/PencilIcon';
import NDSPayerTooltip from '@/components/tabs/ProfileScreen/NDSPayerTooltip';
import DocumentsBlock from '@/components/tabs/ProfileScreen/PaymentTab/DocumentsBlock';
import EntityTypeModal from '@/components/tabs/ProfileScreen/PaymentTab/EntityTypeModal';
import SelfEmployedBlock from '@/components/tabs/ProfileScreen/PaymentTab/SelfEmployedBlock';
import Title from '@/components/tabs/ProfileScreen/Title';
import UserInfoBlock from '@/components/tabs/ProfileScreen/UserInfoBlock';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { User } from '@/store/api/user/types';
import { login } from '@/store/slices/auth/actions';
import { BankDetailsScreenNavigationProp } from '@/types/navigation';
import { ProfileTab } from '@/types/tab';
import { UserEntityType } from '@/types/user';

import styles from './style';

type PaymentTabProps = {
  user: User;
  activeTab: ProfileTab;
  scrollToEnd: () => void;
  onBlockingModal: () => void;
  entityType?: UserEntityType;
};

const PaymentTab = ({
  user,
  activeTab,
  entityType,
  scrollToEnd,
  onBlockingModal,
}: PaymentTabProps) => {
  const theme = useTheme();
  const navigation = useNavigation<BankDetailsScreenNavigationProp>();

  const [isEntityModalVisible, setIsEntityModalVisible] =
    useState<boolean>(false);

  const isSelf = entityType === UserEntityType.self;
  const isIndividual = entityType === UserEntityType.individual;
  const isCompany = entityType === UserEntityType.company;
  const isBankDetailsExist = !!(
    user.bankName &&
    user.checkingAccount &&
    user.correspondingAccount &&
    user.bankID
  );
  const isUserDetailsExist = !!(
    user.ITIN &&
    (isSelf ||
      (isIndividual && user.entityName) ||
      (isCompany && user.entityName && user.RRC))
  );

  const onModal = () => setIsEntityModalVisible(!isEntityModalVisible);

  const editPersonalDetails = () => {
    if (user.isApproved && isSelf) {
      return onBlockingModal();
    }

    onModal();
  };
  const editBankDetails = () => {
    if (user.isApproved) {
      return onBlockingModal();
    }

    navigation.navigate(ProfileScreenName.BankDetails, {
      isCompany,
      bankID: user.bankID,
      bankName: user.bankName,
      checkingAccount: user.checkingAccount,
      correspondingAccount: user.correspondingAccount,
    });
  };

  return (
    <>
      <Title
        withButton={true}
        title="Личные реквизиты"
        onPress={editPersonalDetails}
        buttonLabel={isUserDetailsExist ? 'Изменить' : 'Добавить'}
        icon={
          isUserDetailsExist ? <PencilIcon fill={theme.icons.basic} /> : true
        }
      />
      <Spacer size={isUserDetailsExist ? 'm' : 's'} />
      {/*// if there are user details, then there is a user*/}
      {isUserDetailsExist ? (
        <>
          <UserInfoBlock label="Правовая форма" info={entityType} />
          {(isIndividual || isCompany) && (
            <UserInfoBlock info={user.entityName!} label="Наименование" />
          )}
          <UserInfoBlock info={user.ITIN!} label="ИНН" />
          {isCompany && <UserInfoBlock info={user.RRC!} label="КПП" />}
          {(isIndividual || isCompany) && (
            <>
              <View style={styles.payerContainer}>
                <NDSPayerTooltip />
                <CheckBox disabled checked={user.isNDSPayer} />
              </View>
              <Spacer
                size="xs"
                separator="bottom"
                separatorColor={theme.background.neutralDisableSecond}
              />
            </>
          )}
        </>
      ) : (
        <Text variant="bodySRegular" color={theme.text.neutral}>
          Добавьте информацию о своей правовой форме и заполните налоговые
          реквизиты
        </Text>
      )}
      {user.ITIN && isSelf && (
        <SelfEmployedBlock
          id={user.ID}
          isApproved={user.isApproved}
          onBlockingModal={onBlockingModal}
          isSberPayment={user.isSberPayment}
        />
      )}
      <Spacer size="xxxl" />
      <Title
        title="Банк"
        withButton={true}
        onPress={editBankDetails}
        buttonLabel={isBankDetailsExist ? 'Изменить' : 'Добавить'}
        icon={
          isBankDetailsExist ? <PencilIcon fill={theme.icons.basic} /> : true
        }
      />
      <Spacer size={isBankDetailsExist ? 'm' : 's'} />
      {/*// if there are bank details, then there is a user*/}
      {isBankDetailsExist ? (
        <>
          <UserInfoBlock info={user.bankName!} label="Банк" />
          <UserInfoBlock label="Счет получателя" info={user.checkingAccount!} />
          <UserInfoBlock info={user.bankID!} label="БИК" />
          <UserInfoBlock label="Корр. счет" info={user.correspondingAccount!} />
        </>
      ) : (
        <Text variant="bodySRegular" color={theme.text.neutral}>
          Информации о банковских реквизитах пока нет
        </Text>
      )}
      <Spacer size="xxxl" />
      <DocumentsBlock
        scrollToEnd={scrollToEnd}
        files={user.files}
        activeTab={activeTab}
      />
      <EntityTypeModal
        isApproved={user.isApproved}
        typeValues={{
          ID: user.ID,
          RRC: user.RRC,
          ITIN: user.ITIN,
          entityName: user.entityName,
          isNDSPayer: user.isNDSPayer,
        }}
        isVisible={isEntityModalVisible}
        onCloseModal={onModal}
        type={
          user.ITIN && user.entityTypeID
            ? {
                ID: user.entityTypeID,
                description: user.entityTypeDescription,
              }
            : undefined
        }
      />
    </>
  );
};

export default PaymentTab;
