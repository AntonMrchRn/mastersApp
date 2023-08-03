import { TaskCardBottomButton } from '@/components/task/TaskCard/TaskCardBottom';
import { GetOffersResponse, Offer } from '@/store/api/tasks/types';
import { File } from '@/types/fileManager';
import { OutlayStatusType, StatusType, TaskTab, TaskType } from '@/types/task';

export const getButtons = ({
  subsetID,
  statusID,
  tab,
  isCommentsAvailable,
  navigateToChat,
  onSubmissionModalVisible,
  userOffersData,
  isOffersDeadlineOver,
  onSubmitAnEstimate,
  onWorkDelivery,
  onCancelModalVisible,
  estimateBottomVisible,
  onAddEstimateMaterial,
  selectedServiceId,
  onEstimateBottomVisible,
  files,
  onUploadModalVisible,
  outlayStatusID,
  onSendEstimateForApproval,
  onBudgetModalVisible,
}: {
  /**
   * Тип задачи
   */
  subsetID: TaskType | undefined;
  /**
   * Статус задачи
   */
  statusID: StatusType | undefined;
  /**
   * Текущий таб задачи
   */
  tab: TaskTab;
  isCommentsAvailable: boolean;
  navigateToChat: () => void;
  onSubmissionModalVisible: () => void;
  isOffersDeadlineOver: boolean;
  userOffersData: Offer[];
  onSubmitAnEstimate: () => void;
  onWorkDelivery: () => Promise<void>;
  onCancelModalVisible: () => void;
  estimateBottomVisible: boolean;
  onAddEstimateMaterial: () => void;
  selectedServiceId: number | undefined;
  onEstimateBottomVisible: () => void;
  onUploadModalVisible: () => void;
  files: File[];
  outlayStatusID: OutlayStatusType | undefined;
  onSendEstimateForApproval: () => Promise<void>;
  onBudgetModalVisible: () => void;
}): TaskCardBottomButton[] => {
  switch (subsetID) {
    case TaskType.COMMON_FIRST_RESPONSE:
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
              return [
                {
                  label: 'Принять задачу',
                  variant: 'accent',
                  onPress: onSubmissionModalVisible,
                },
              ];
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
              return [
                {
                  label: 'Принять задачу',
                  variant: 'accent',
                  onPress: onSubmissionModalVisible,
                },
              ];
            default:
              return [];
          }
        case StatusType.WORK:
          switch (tab) {
            case TaskTab.REPORT:
              if (files.length) {
                return [
                  {
                    label: 'Сдать работы',
                    variant: 'accent',
                    onPress: onWorkDelivery,
                  },
                  {
                    label: 'Загрузить еще файлы',
                    variant: 'outlineAccent',
                    onPress: onUploadModalVisible,
                  },
                ];
              }
              return [
                {
                  label: 'Загрузить файлы',
                  variant: 'accent',
                  onPress: onUploadModalVisible,
                },
              ];
            case TaskTab.DESCRIPTION:
            case TaskTab.HISTORY:
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
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
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
            case TaskTab.ESTIMATE:
              if (estimateBottomVisible) {
                return [
                  {
                    label: 'Выбрать',
                    variant: 'accent',
                    onPress: onAddEstimateMaterial,
                    disabled: !selectedServiceId,
                  },
                  {
                    label: 'Отменить',
                    variant: 'outlineAccent',
                    onPress: onEstimateBottomVisible,
                  },
                ];
              }
              if (outlayStatusID !== OutlayStatusType.READY) {
                return [
                  {
                    label: 'Отправить смету на согласование',
                    variant: 'accent',
                    onPress: onSendEstimateForApproval,
                    disabled: outlayStatusID === OutlayStatusType.MATCHING,
                  },
                  {
                    label: 'Отказаться от задачи',
                    variant: 'outlineDanger',
                    onPress: onCancelModalVisible,
                  },
                ];
              }
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
        case StatusType.SUMMARIZING:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
              return [];
            case TaskTab.REPORT:
              if (files.length) {
                return [
                  {
                    label: 'Загрузить еще файлы',
                    variant: 'outlineAccent',
                    onPress: onUploadModalVisible,
                  },
                ];
              }
              return [
                {
                  label: 'Загрузить файлы',
                  variant: 'accent',
                  onPress: onUploadModalVisible,
                },
              ];
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
            default:
              return [];
          }
        case StatusType.PAID:
        case StatusType.PENDING:
        case StatusType.COMPLETED:
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
        case StatusType.CLOSED:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
        case StatusType.SIGNING:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
              return [];
            case TaskTab.REPORT:
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
            default:
              return [];
          }
        default:
          return [];
      }

    case TaskType.COMMON_AUCTION_SALE:
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
            case TaskTab.COMMENTS:
              if (isOffersDeadlineOver) {
                return [];
              }
              if (userOffersData.length) {
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
                  onPress: onSubmitAnEstimate,
                },
              ];
            default:
              return [];
          }
        case StatusType.WORK:
          switch (tab) {
            case TaskTab.REPORT:
              if (files.length) {
                return [
                  {
                    label: 'Сдать работы',
                    variant: 'accent',
                    onPress: onWorkDelivery,
                  },
                  {
                    label: 'Загрузить еще файлы',
                    variant: 'outlineAccent',
                    onPress: onUploadModalVisible,
                  },
                ];
              }
              return [
                {
                  label: 'Загрузить файлы',
                  variant: 'accent',
                  onPress: onUploadModalVisible,
                },
              ];
            case TaskTab.DESCRIPTION:
            case TaskTab.HISTORY:
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
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
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
            case TaskTab.ESTIMATE:
              if (estimateBottomVisible) {
                return [
                  {
                    label: 'Выбрать',
                    variant: 'accent',
                    onPress: onAddEstimateMaterial,
                    disabled: !selectedServiceId,
                  },
                  {
                    label: 'Отменить',
                    variant: 'outlineAccent',
                    onPress: onEstimateBottomVisible,
                  },
                ];
              }
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
        case StatusType.SUMMARIZING:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
              return [];
            case TaskTab.REPORT:
              if (files.length) {
                return [
                  {
                    label: 'Загрузить еще файлы',
                    variant: 'outlineAccent',
                    onPress: onUploadModalVisible,
                  },
                ];
              }
              return [
                {
                  label: 'Загрузить файлы',
                  variant: 'accent',
                  onPress: onUploadModalVisible,
                },
              ];
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
            default:
              return [];
          }
        case StatusType.PAID:
        case StatusType.PENDING:
        case StatusType.COMPLETED:
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
        case StatusType.CLOSED:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
        case StatusType.SIGNING:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable) {
                return [
                  {
                    label: 'Перейти в чат',
                    variant: 'accent',
                    onPress: navigateToChat,
                  },
                ];
              }
              return [];
            case TaskTab.REPORT:
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
            default:
              return [];
          }
        default:
          return [];
      }
    case TaskType.IT_AUCTION_SALE:
    case TaskType.IT_FIRST_RESPONSE:
    case TaskType.IT_INTERNAL_EXECUTIVES:
    default:
      return [];
  }
};
