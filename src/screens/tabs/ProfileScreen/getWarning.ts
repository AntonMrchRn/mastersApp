import { User } from '@/store/api/user/types';
import { UserEntityType } from '@/types/user';

const getWarning = (isInternalExecutor: boolean, user?: User) => {
  const entity = !user?.entityTypeID ? '\n  •  Правовая форма' : '';
  const ITIN = !user?.ITIN ? '\n  •  ИНН' : '';
  const RRC =
    !user?.RRC && user?.entityTypeDescription !== UserEntityType.self
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
    !user?.name || !user.sname
      ? '\n  •  Во вкладке Общее укажите свои персональные данные'
      : '';
  const paymentWarning =
    (entity || ITIN || RRC || bankDetails) && !isInternalExecutor
      ? '\n  •  Во вкладке Оплата укажите правовую форму, ИНН, КПП (для ИП и юр. лиц) и банковские реквизиты'
      : '';
  const activityWarning =
    !user?.regionIDs.length || !user?.setIDs.length
      ? '\n  •  Во вкладке Деятельность выберите направление услуг и регион'
      : '';

  const isGenericWarning = !!(
    (commonWarning && paymentWarning) ||
    (commonWarning && activityWarning) ||
    (paymentWarning && activityWarning)
  );

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

export default getWarning;
