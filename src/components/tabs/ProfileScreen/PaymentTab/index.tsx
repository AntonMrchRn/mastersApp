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
import { BankDetailsScreenNavigationProp } from '@/types/navigation';
import { ProfileTab } from '@/types/tab';
import { UserEntityType } from '@/types/user';

import { ConfidenceCoefficientBlock } from './ConfidenceCoefficientBlock';

import styles from './style';

type PaymentTabProps = {
  user: User;
  activeTab: ProfileTab;
  scrollToEnd: () => void;
  onBlockingModalOpen: () => void;
  entityType?: UserEntityType;
};

const PaymentTab = ({
  user,
  activeTab,
  entityType,
  scrollToEnd,
  onBlockingModalOpen,
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

  const onEntityModalOpen = () => setIsEntityModalVisible(true);
  const onEntityModalClose = () => setIsEntityModalVisible(false);

  const editPersonalDetails = () => {
    if (user.isApproved && isSelf) {
      return onBlockingModalOpen();
    }
    onEntityModalOpen();
  };
  const editBankDetails = () => {
    if (user.isApproved) {
      return onBlockingModalOpen();
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
      {!!user.serviceMultiplier && (
        <ConfidenceCoefficientBlock
          serviceMultiplier={user.serviceMultiplier}
        />
      )}
      <Title
        withButton
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
            <UserInfoBlock
              info={user.entityName as string}
              label="Наименование"
            />
          )}
          <UserInfoBlock info={user.ITIN as string} label="ИНН" />
          {isCompany && <UserInfoBlock info={user.RRC as string} label="КПП" />}
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
          onBlockingModalOpen={onBlockingModalOpen}
          isSberPayment={user.isSberPayment}
        />
      )}
      <Spacer size="xxxl" />
      <Title
        withButton
        title="Банк"
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
          <UserInfoBlock info={user.bankName as string} label="Банк" />
          <UserInfoBlock
            label="Счет получателя"
            info={user.checkingAccount as string}
          />
          <UserInfoBlock info={user.bankID as string} label="БИК" />
          <UserInfoBlock
            label="Корр. счет"
            info={user.correspondingAccount as string}
          />
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
        onCloseModal={onEntityModalClose}
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
