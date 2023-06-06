import { useState } from 'react';

import { IconTypes, Types } from 'rn-ui-kit/lib/typescript/components/Banner';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Button';

import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

export type TaskCardContants = {
  title: string;
  name: string;
  phone: string;
};
export const useTaskCardDescription = (status: TaskCardStatus) => {
  const [budgetSubmission, setBudgetSubmission] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [budgetCanceled, setBudgetCanceled] = useState(false);

  const onBudgetSubmission = () => {
    setBudgetSubmission(!budgetSubmission);
  };
  const onBudgetModalVisible = () => {
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onRevokeBudget = () => {
    setBudgetSubmission(!budgetSubmission);
    setBudgetModalVisible(!budgetModalVisible);
  };

  const contacts: TaskCardContants[] = [
    {
      title: 'Роль контактного лица',
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 999-99-99',
    },
    {
      title: 'Роль контактного лица',
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 999-99-99',
    },
  ];
  const files = [
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/19945c8cc72150f1f1b08befd230cda5.png',
      name: 'Screenshot_7',
      fileID: 282,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/png',
      extension: 'png',
      extensionOriginal: 'png',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c5509c4413f1bb001e430af9ba78b3dc.jpg',
      name: '169887-gorod-zdanie-purpur-tsvetnoy-liniya_gorizonta-7680x4320',
      fileID: 283,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/5f050b889b25f9ed68f7db4f7072ead4.mp4',
      name: '2022-09-30 14-54-49_Trim',
      fileID: 285,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'video/mp4',
      extension: 'video',
      extensionOriginal: 'mp4',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/af2d14c8f901b6ed9fa7e57f6cb9b5b3.jpg',
      name: '170099-priroda-derevo-dekoracii-peyzash-doroga-3840x2160',
      fileID: 290,
      userID: 43,
      isCheck: false,
      isOffer: true,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/995b4b540924a3b2bb13cdd638f4bda8.webp',
      name: 'test11234',
      fileID: 574,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c8116803277e5ab2421e3dcf67d35c87.webp',
      name: 'test1123',
      fileID: 575,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/816a2b1781e343aa9c8e09e98dfc6f2f.pdf',
      name: 'Act-180',
      fileID: 578,
      userID: 8,
      isCheck: false,
      isOffer: false,
      mime: 'application/pdf',
      extension: 'pdf',
      extensionOriginal: 'pdf',
      isApplication: false,
      size: 100,
    },
  ];
  const getButtons = (): {
    label: string;
    variant: Variant;
    onPress?: () => void;
  }[] => {
    switch (status) {
      case 'published':
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
      case 'inProgress':
        return [
          {
            label: 'Сдать работы',
            variant: 'accent',
          },
          {
            label: 'Отказаться от задачи',
            variant: 'outlineDanger',
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
    switch (status) {
      case 'published':
        if (budgetCanceled) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
          };
        }
        return null;
      case 'workDelivery':
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: 'Координатор проверяет выполненные услуги. После успешной проверки задача будет передана на оплату',
        };
      case 'done':
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
      case 'cancelled':
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
    contacts,
    files,
    buttons,
    banner,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
  };
};
