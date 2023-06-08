import { useState } from 'react';

import { IconTypes, Types } from 'rn-ui-kit/lib/typescript/components/Banner';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Button';

import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

export const useTaskCardDescription = (statusCode: TaskCardStatus) => {
  const [budgetSubmission, setBudgetSubmission] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [budgetCanceled, setBudgetCanceled] = useState(false);
  const [dateTo, setDateTo] = useState('2023-04-17');
  const [inputDateValue, setInputDateValue] = useState('');

  const onBudgetSubmission = () => {
    setBudgetSubmission(!budgetSubmission);
  };
  const onBudgetModalVisible = () => {
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onCancelModalVisible = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const onDateModalVisible = () => {
    setDateModalVisible(!dateModalVisible);
  };
  const onInputDateValue = (text: string) => {
    setInputDateValue(text);
  };
  const onRevokeBudget = () => {
    setBudgetSubmission(!budgetSubmission);
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onDateBottomSheetButton = () => {
    const dateArray = inputDateValue.split('/');
    const currentDate = `20${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    setDateTo(currentDate);
    setInputDateValue('');
    onDateModalVisible();
  };
  const onWorkDelivery = () => {
    // setStatus('workDelivery');
  };
  const onCancelTask = () => {
    // setStatus('published');
    onCancelModalVisible();
  };
  const getButtons = (): {
    label: string;
    variant: Variant;
    onPress?: () => void;
  }[] => {
    switch (statusCode) {
      case 'active':
        if (budgetCanceled) {
          return [];
        }
        if (budgetSubmission) {
          return [
            {
              label: 'Отозвать смету',
              variant: 'outlineDanger',
              onPress: onBudgetModalVisible,
            },
          ];
        }
        return [
          {
            label: 'Подать смету',
            variant: 'accent',
            onPress: onBudgetSubmission,
          },
        ];
      case 'signing':
        return [
          {
            label: 'Сдать работы',
            variant: 'accent',
            onPress: onWorkDelivery,
          },
          {
            label: 'Отказаться от задачи',
            variant: 'outlineDanger',
            onPress: onCancelModalVisible,
          },
        ];
      default:
        return [];
    }
  };
  const getBanner = (): {
    title: string;
    type: Types;
    icon: IconTypes;
    text: string;
  } | null => {
    switch (statusCode) {
      case 'active':
        if (budgetCanceled) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
          };
        }
        return null;
      case 'summarizing':
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: 'Координатор проверяет выполненные услуги. После успешной проверки задача будет передана на оплату',
        };
      case 'completed':
        return {
          title: 'Выполненные услуги приняты',
          type: 'success',
          icon: 'success',
          text: 'В ближайшее время оплата поступит на вашу банковскую карту/счет',
        };
      case 'paid':
        return {
          title: 'Оплата произведена',
          type: 'success',
          icon: 'success',
          text: 'Денежные средства переведены вам на указанные в профиле реквизиты',
        };
      case 'cancelledByExecutor':
      case 'cancelledByCustomer':
        return {
          title: 'Задача отменена',
          type: 'error',
          icon: 'alert',
          text: 'По инициативе координатора выполнение задачи прекращено',
        };
      default:
        return null;
    }
  };
  const banner = getBanner();
  const buttons = getButtons();
  return {
    buttons,
    banner,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    onDateModalVisible,
    dateModalVisible,
    inputDateValue,
    onInputDateValue,
    onDateBottomSheetButton,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
  };
};
