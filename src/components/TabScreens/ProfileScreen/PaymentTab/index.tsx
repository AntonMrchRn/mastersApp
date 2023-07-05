import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { CheckBox, Spacer, Text, useTheme } from 'rn-ui-kit';

import PencilIcon from '@/assets/icons/svg/screens/PencilIcon';
import NDSPayerTooltip from '@/components/TabScreens/ProfileScreen/NDSPayerTooltip';
import SelfEmployedBlock from '@/components/TabScreens/ProfileScreen/PaymentTab/SelfEmployedBlock';
import Title from '@/components/TabScreens/ProfileScreen/Title';
import UserInfoBlock from '@/components/TabScreens/ProfileScreen/UserInfoBlock';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { User } from '@/store/api/user/types';
import { BankDetailsScreenNavigationProp } from '@/types/navigation';
import { UserEntityType } from '@/types/user';

import styles from './style';

type PaymentTabProps = {
  user: User;
  onEntityModalOpen: () => void;
  entityType?: UserEntityType;
};

const PaymentTab = ({
  user,
  entityType,
  onEntityModalOpen,
}: PaymentTabProps) => {
  const theme = useTheme();
  const navigation = useNavigation<BankDetailsScreenNavigationProp>();

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

  const navigateToBankDetails = () => {
    navigation.navigate(ProfileScreenName.BankDetails, {
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
        onPress={onEntityModalOpen}
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
        <SelfEmployedBlock id={user.ID} isSberPayment={user.isSberPayment} />
      )}
      <Spacer size="xxxl" />
      <Title
        title="Банк"
        withButton={true}
        onPress={navigateToBankDetails}
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
    </>
  );
};

export default PaymentTab;
