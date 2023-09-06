import { BannerProps } from 'rn-ui-kit/lib/typescript/components/Banner';

import { Curator, Executor } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType, TaskTab } from '@/types/task';

export const getBanner = ({
  tab,
  statusID,
  outlayStatusID,
  navigateToChat,
  executor,
  isContractor,
  isCurator,
  curator,
  cancelReason,
}: {
  tab: TaskTab;
  statusID: StatusType | undefined;
  outlayStatusID: OutlayStatusType | undefined;
  navigateToChat: () => void;
  curator?: Curator;
  executor?: Executor;
  isContractor: boolean;
  isCurator: boolean;
  cancelReason: string | undefined;
}): BannerProps | null => {
  if (tab === TaskTab.DESCRIPTION) {
    switch (statusID) {
      case StatusType.ACTIVE:
        if (outlayStatusID === OutlayStatusType.CANCELLED) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
          };
        }
        if (isContractor) {
          return {
            type: 'info',
            icon: 'alert',
            text: `Куратор ${
              executor?.curatorName + ' ' + executor?.curatorSname
            } выбрал вас в качестве подрядчика`,
          };
        }
        if (isCurator && curator && !curator.isConfirm) {
          return {
            type: 'info',
            icon: 'alert',
            text: 'Вас выбрали в качестве кандидата на роль куратора',
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
          };
        }
        return null;
      case StatusType.SUMMARIZING:
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: 'Координатор проверяет выполненные услуги. После успешной проверки задача будет передана на оплату',
        };
      case StatusType.COMPLETED:
        return {
          title: 'Выполненные услуги приняты',
          type: 'success',
          icon: 'success',
          text: 'В ближайшее время оплата поступит на вашу банковскую карту/счет',
        };
      case StatusType.PAID:
        return {
          title: 'Оплата произведена',
          type: 'success',
          icon: 'success',
          text: 'Денежные средства переведены вам на указанные в профиле реквизиты',
        };
      case StatusType.CANCELLED_BY_CUSTOMER:
      case StatusType.CANCELLED_BY_EXECUTOR:
        return {
          title: 'Задача отменена',
          type: 'error',
          icon: 'alert',
          text: cancelReason
            ? `Координатор указал причину «${cancelReason}»`
            : 'По инициативе координатора выполнение задачи прекращено',
        };
      default:
        return null;
    }
  }
  return null;
};
