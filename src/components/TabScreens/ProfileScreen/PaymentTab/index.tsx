import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Button,
  CheckBox,
  Spacer,
  Text,
  Tooltip,
  useTheme,
  useToast,
} from 'rn-ui-kit';

import PencilIcon from '@/assets/icons/svg/screens/PencilIcon';
import QuestionIcon from '@/assets/icons/svg/screens/QuestionIcon';
import Title from '@/components/TabScreens/ProfileScreen/Title';
import UserInfoBlock from '@/components/TabScreens/ProfileScreen/UserInfoBlock';
import useConnectionInfo from '@/hooks/useConnectionInfo';
import { useAppSelector } from '@/store';
import {
  useGetEntityTypesQuery,
  useGetUserParamsQuery,
  useGetUserQuery,
} from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import {
  BankDetailsScreenNavigationProp,
  ProfileNavigatorScreenName,
} from '@/types/navigation';
import { UserEntityType } from '@/types/user';

import styles from './style';

const hitSlop = { top: 10, left: 10, right: 10, bottom: 10 };
const selfTooltipCoords = { x: -185, y: 85 };
const payerTooltipCoords = { x: -171, y: 100 };

const PaymentTab = () => {
  const theme = useTheme();
  const toast = useToast();
  const isConnected = useConnectionInfo();
  const navigation = useNavigation<BankDetailsScreenNavigationProp>();

  const { user: authUser } = useAppSelector(selectAuth);

  const { data: user } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID || !isConnected,
  });
  const {
    data: params,
    error: paramsError,
    isError: isParamsError,
  } = useGetUserParamsQuery(undefined, {
    skip: !isConnected,
  });
  const {
    data: entityType,
    error: entityError,
    isError: isEntityError,
  } = useGetEntityTypesQuery(undefined, {
    skip: !isConnected,
    selectFromResult: ({ data, error, isError }) => ({
      data: data?.find(entityType => entityType.ID === user?.entityTypeID),
      error: error,
      isError: isError,
    }),
  });

  const [isSelfTooltipVisible, setIsSelfTooltipVisible] =
    useState<boolean>(false);
  const [isPayerTooltipVisible, setIsPayerTooltipVisible] =
    useState<boolean>(false);
  const [isSelfChecked, setIsSelfChecked] = useState<boolean>(
    !!user?.isSberPayment
  );
  const [isPayerChecked, setIsPayerChecked] = useState<boolean>(
    !!user?.isNDSPayer
  );

  const isBankDetailsExist = !!(
    user?.bankName &&
    user?.checkingAccount &&
    user?.correspondingAccount &&
    user?.bankID
  );
  const isSelf = entityType?.description === UserEntityType.self;
  const isIndividual = entityType?.description === UserEntityType.individual;
  const isCompany = entityType?.description === UserEntityType.company;
  const isUserDetailsExist = !!(
    user?.ITIN &&
    (isSelf ||
      (isIndividual && user.entityName) ||
      (isCompany && user.entityName && user.RRC))
  );

  useEffect(() => {
    if (isEntityError || isParamsError) {
      toast.show({
        type: 'error',
        title: (
          (entityError ? entityError : paramsError) as AxiosQueryErrorResponse
        )?.data?.message,
        contentHeight: 120,
      });
    }
  }, [isEntityError, isParamsError]);

  const onPayerTooltipOpen = () => setIsPayerTooltipVisible(true);
  const onPayerTooltipClose = () => setIsPayerTooltipVisible(false);
  const onSelfTooltipOpen = () => setIsSelfTooltipVisible(true);
  const onSelfTooltipClose = () => setIsSelfTooltipVisible(false);
  const changeSelf = () => setIsSelfChecked(!isSelfChecked);
  const changePayer = () => setIsPayerChecked(!isPayerChecked);

  const goToSber = useCallback(async () => {
    if (params?.sberLink) {
      const supported = await Linking.canOpenURL(params?.sberLink);
      if (supported) {
        await Linking.openURL(params.sberLink);
      } else {
        console.log('goToSber link unsupported');
        toast.show({
          type: 'error',
          title:
            'Не удалось перейти в «Свое дело». Пожалуйста, повторите позже',
          contentHeight: 120,
        });
      }
    }
  }, [params?.sberLink]);

  const navigateToBankDetails = () => {
    navigation.navigate(ProfileNavigatorScreenName.BankDetails, {
      bankID: user?.bankID,
      bankName: user?.bankName,
      checkingAccount: user?.checkingAccount,
      correspondingAccount: user?.correspondingAccount,
    });
  };

  return (
    <>
      <Title
        withButton={true}
        title="Личные реквизиты"
        onPress={() => Alert.alert('В работе')}
        buttonLabel={isUserDetailsExist ? 'Изменить' : 'Добавить'}
        icon={
          isUserDetailsExist ? <PencilIcon fill={theme.icons.basic} /> : true
        }
      />
      <Spacer size={isUserDetailsExist ? 'm' : 's'} />
      {isUserDetailsExist ? (
        <>
          <UserInfoBlock
            label="Правовая форма"
            info={entityType!.description}
          />
          {isIndividual ||
            (isCompany && (
              <UserInfoBlock info={user!.entityName!} label="Наименование" />
            ))}
          <UserInfoBlock info={user!.ITIN!} label="ИНН" />
          {isCompany && <UserInfoBlock info={user!.RRC!} label="КПП" />}
          {(isIndividual || isCompany) && (
            <>
              <View style={styles.payerContainer}>
                <View style={styles.payerTooltip}>
                  <Text variant="bodyMRegular" style={styles.tooltipTitle}>
                    Плательщик НДС
                  </Text>
                  <TouchableOpacity
                    hitSlop={hitSlop}
                    onPress={onPayerTooltipOpen}
                  >
                    <QuestionIcon fill={theme.icons.neutral} />
                  </TouchableOpacity>
                  <Tooltip
                    triangleEdge="bottom"
                    triagnleAlign={'center'}
                    coords={payerTooltipCoords}
                    onClose={onPayerTooltipClose}
                    isVisible={isPayerTooltipVisible}
                    text={`Сумма НДС будет выделяться из итоговой \n суммы сметы по формуле:\n НДС = Сумма/120*20`}
                  />
                </View>
                <CheckBox onPress={changePayer} checked={isPayerChecked} />
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
          Добавьте информацию о своей правовом форме и заполните налоговые
          реквизиты
        </Text>
      )}
      <Spacer size="xxxl" />
      <View style={styles.selfContainer}>
        <Text variant="title3" style={styles.tooltipTitle}>
          Самозанятым
        </Text>
        <TouchableOpacity hitSlop={hitSlop} onPress={onSelfTooltipOpen}>
          <QuestionIcon fill={theme.icons.neutral} />
        </TouchableOpacity>
        <Tooltip
          triangleEdge="bottom"
          isVisible={isSelfTooltipVisible}
          triagnleAlign={'center'}
          coords={selfTooltipCoords}
          onClose={onSelfTooltipClose}
          text="Оплата услуг самозанятых производится через сервис «Свое дело»"
        />
      </View>
      <Spacer size="xl" />
      <View style={styles.sber}>
        <Text variant="bodyMRegular">Оплата по Сбербанк «Свое дело»</Text>
        <CheckBox
          onPress={changeSelf}
          disabled={!!entityType?.description}
          checked={
            isSelf ? true : isIndividual || isCompany ? false : isSelfChecked
          }
        />
      </View>
      <Spacer
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
      <Spacer size="l" />
      <Button
        size="S"
        onPress={goToSber}
        variant="outlineAccent"
        label="Перейти в «Свое дело»"
        disabled={isIndividual || isCompany}
      />
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
          <UserInfoBlock info={user!.bankName!} label="Банк" />
          <UserInfoBlock
            label="Счет получателя"
            info={user!.checkingAccount!}
          />
          <UserInfoBlock info={user!.bankID!} label="БИК" />
          <UserInfoBlock
            label="Корр. счет"
            info={user!.correspondingAccount!}
          />
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
