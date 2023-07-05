import React, { useCallback, useEffect, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import {
  Button,
  CheckBox,
  Spacer,
  Text,
  Tooltip,
  useTheme,
  useToast,
} from 'rn-ui-kit';

import QuestionIcon from '@/assets/icons/svg/screens/QuestionIcon';
import { hitSlop } from '@/constants/platform';
import { useEditUserMutation, useGetUserParamsQuery } from '@/store/api/user';
import { User } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';

import styles from './style';

const selfTooltipCoords = { x: -151, y: 85 };

type SelfEmployedBlockProps = {
  id: User['ID'];
  isSberPayment: User['isSberPayment'];
};

const SelfEmployedBlock = ({ id, isSberPayment }: SelfEmployedBlockProps) => {
  const theme = useTheme();
  const toast = useToast();

  const {
    data: params,
    isError: isParamsError,
    error: paramsError,
  } = useGetUserParamsQuery();

  const [editIsSberPayment, { isError: isSberError }] = useEditUserMutation();
  const [isSelfTooltipVisible, setIsSelfTooltipVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (isParamsError || isSberError) {
      toast.show({
        type: 'error',
        title: isSberError
          ? 'Изменение данных невозможно'
          : (paramsError as AxiosQueryErrorResponse)?.data?.message,
        contentHeight: 120,
      });
    }
  }, [isParamsError, isSberError]);

  const onSelfTooltipOpen = () => setIsSelfTooltipVisible(true);
  const onSelfTooltipClose = () => setIsSelfTooltipVisible(false);
  const editIsSber = async (isSberPayment: boolean) => {
    await editIsSberPayment({ ID: id, isSberPayment });
  };

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

  return (
    <>
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
          text={`Доступна оплата услуг самозанятых \n через сервис «Свое дело»`}
        />
      </View>
      <Spacer size="xl" />
      <View style={styles.sber}>
        <Text variant="bodyMRegular">Оплата по Сбербанк «Свое дело»</Text>
        <CheckBox
          onPress={() => editIsSber(!isSberPayment)}
          checked={isSberPayment}
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
      />
    </>
  );
};

export default SelfEmployedBlock;
