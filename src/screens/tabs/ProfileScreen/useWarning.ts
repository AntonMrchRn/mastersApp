import { useEffect } from 'react';

import { useToast } from 'rn-ui-kit';

import useConnectionInfo from '@/hooks/useConnectionInfo';
import { useAppSelector } from '@/store';
import { useGetEntityTypesQuery } from '@/store/api/user';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { UserEntityType } from '@/types/user';

const useWarning = () => {
  const isConnected = useConnectionInfo();
  const { user } = useAppSelector(selectUser);
  const toast = useToast();

  const {
    data: entityType,
    error,
    isError,
  } = useGetEntityTypesQuery(undefined, {
    skip: !isConnected,
    selectFromResult: ({ data, error, isError }) => ({
      data: data?.find(entityType => entityType.ID === user?.entityTypeID),
      error: error,
      isError: isError,
    }),
  });

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse)?.data?.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  const entity = !user?.entityTypeID ? '\n  •  Правовая форма' : '';
  const ITIN = !user?.ITIN ? '\n  •  ИНН' : '';
  const RRC =
    !user?.RRC && entityType?.description !== UserEntityType.self
      ? '\n  •  КПП (для ИП и юр. лиц)'
      : '';
  const bankDetails = !(
    user?.bankName &&
    user?.checkingAccount &&
    user?.correspondingAccount &&
    user?.bankID
  )
    ? '\n  •  Банковские реквизиты'
    : '';

  const paymentWarningMessage = `Для выполнения задач во вкладке Оплата заполните следующие данные: ${entity} ${ITIN} ${RRC} ${bankDetails}`;
  const activityWarningMessage = `Для выполнения задач во вкладке Деятельность выберите направление услуг и регион`;
  const commonWarningMessage = `Для выполнения задач во вкладке Общее укажите свои персональные данные`;

  const commonWarning =
    !user?.name || !user.sname || !user?.pname
      ? '\n  •  Во вкладке Общее укажите свои персональные данные'
      : '';
  const paymentWarning =
    entity || ITIN || RRC || bankDetails
      ? '\n  •  Во вкладке Оплата укажите правовую форму, ИНН, КПП (для ИП и юр. лиц) и банковские реквизиты'
      : '';
  const activityWarning =
    !user?.regionIDs.length || !user?.setIDs.length
      ? '\n  •  Во вкладке Деятельность выберите направление услуг и регион'
      : '';

  const isGenericWarning =
    (commonWarning && paymentWarning) ||
    (commonWarning && activityWarning) ||
    (paymentWarning && activityWarning);

  const genericWarning = `Для выполнения задач заполните следующие данные: ${commonWarning} ${paymentWarning} ${activityWarning}`;
  const singleWarning =
    (commonWarning && commonWarningMessage) ||
    (paymentWarning && paymentWarningMessage) ||
    (activityWarning && activityWarningMessage);

  if (user) {
    return isGenericWarning ? genericWarning : singleWarning;
  }

  return '';
};

export default useWarning;
