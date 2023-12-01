import { BannerProps } from 'rn-ui-kit/lib/typescript/components/Banner';

import { Executor } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType, TaskTab } from '@/types/task';

export const getBanner = ({
  tab,
  statusID,
  outlayStatusID,
  navigateToChat,
  executor,
  isContractor,
  cancelReason,
  isInvitedExecutor,
  isInternalExecutor,
  isSelfEmployed,
  isSberPayment,
  navigateToReport,
  visible,
  unVisible,
  isInvitedCurator,
}: {
  tab: TaskTab;
  statusID: StatusType | undefined;
  outlayStatusID: OutlayStatusType | undefined;
  navigateToChat: () => void;
  executor?: Executor;
  isContractor: boolean;
  cancelReason: string | undefined;
  isInvitedExecutor: boolean;
  isInternalExecutor: boolean;
  isSelfEmployed: boolean;
  isSberPayment: boolean | undefined;
  navigateToReport: () => void;
  visible: boolean;
  unVisible: () => void;
  isInvitedCurator: boolean;
}): BannerProps | null => {
  if (tab === TaskTab.DESCRIPTION && visible) {
    switch (statusID) {
      case StatusType.ACTIVE:
        if (outlayStatusID === OutlayStatusType.CANCELLED) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
            onClosePress: unVisible,
          };
        }
        if (isContractor) {
          return {
            type: 'info',
            icon: 'alert',
            text: `Куратор ${
              executor?.curatorName + ' ' + executor?.curatorSname
            } выбрал вас в качестве подрядчика`,
            onClosePress: unVisible,
          };
        }
        if (isInvitedExecutor) {
          return {
            type: 'info',
            icon: 'alert',
            text: 'Вас выбрали в качестве кандидата на роль исполнителя',
            onClosePress: unVisible,
          };
        }
        if (isInvitedCurator) {
          return {
            type: 'info',
            icon: 'alert',
            text: 'Вас выбрали в качестве кандидата на роль куратора',
            onClosePress: unVisible,
          };
        }
        return null;
      case StatusType.WORK:
        if (outlayStatusID === OutlayStatusType.RETURNED) {
          return {
            title: 'Задача не принята',
            type: 'error',
            icon: 'alert',
            text: 'После проверки задача возвращена на доработку. Уточнить подробности у координатора можно в комментариях',
            buttonText: 'Написать координатору',
            onButtonPress: navigateToChat,
            onClosePress: unVisible,
          };
        }
        return null;
      case StatusType.SUMMARIZING:
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: `Координатор проверяет выполненные услуги. После успешной проверки задача будет ${
            isInternalExecutor ? 'считаться выполненной' : 'передана на оплату'
          }`,
          onClosePress: unVisible,
        };
      case StatusType.COMPLETED:
        return {
          title: 'Выполненные услуги приняты',
          type: 'success',
          icon: 'success',
          text: 'В ближайшее время оплата поступит на вашу банковскую карту/счет',
          onClosePress: unVisible,
        };
      case StatusType.PAID:
        if (!isInternalExecutor && isSelfEmployed && !isSberPayment) {
          return {
            title: 'Оплата произведена',
            type: 'success',
            icon: 'success',
            text: 'Денежные средства переведены вам на указанные в профиле реквизиты.\nДля завершения задачи загрузите чек об оплате',
            buttonText: 'Загрузить файл',
            onButtonPress: navigateToReport,
            onClosePress: unVisible,
          };
        }
        return null;
      case StatusType.CANCELLED_BY_CUSTOMER:
      case StatusType.CANCELLED_BY_EXECUTOR:
        return {
          title: 'Задача отменена',
          type: 'error',
          icon: 'alert',
          text: cancelReason
            ? `Координатор указал причину «${cancelReason}»`
            : 'По инициативе координатора выполнение задачи прекращено',
          onClosePress: unVisible,
        };
      default:
        return null;
    }
  }
  return null;
};
