import { TaskCardBottomButton } from '@/components/task/TaskCard/TaskCardBottom';
import { Offer } from '@/store/api/tasks/types';
import { File } from '@/types/fileManager';
import { OutlayStatusType, StatusType, TaskTab, TaskType } from '@/types/task';

export const getButtons = ({
  tab,
  toClose,
  subsetID,
  statusID,
  isCurator,
  isExecutor,
  reportFiles,
  closureFiles,
  onCancelTask,
  isContractor,
  onSubmitAnTask,
  navigateToChat,
  userOffersData,
  onWorkDelivery,
  outlayStatusID,
  onBecomeCurator,
  isInvitedCurator,
  onTaskSubmission,
  isInvitedExecutor,
  isCommentsAvailable,
  isCuratorAllowedTask,
  isOffersDeadlineOver,
  onUploadModalVisible,
  onBudgetModalVisible,
  isConfirmedContractor,
  isRefusedInvitedCurator,
  isRefusedInvitedExecutor,
  onOpenCancelModalVisible,
  onSubmissionModalVisible,
  onApproveEstimateChanges,
  onSendEstimateForApproval,
  isTaskClosedWithoutMessages,
  isTaskWithUnconfirmedCurator,
  isLastChangesFromCoordinator,
  isTaskCanceledWithoutMessages,
}: {
  /**
   * Текущий таб задачи
   */
  tab: TaskTab;
  /**
   * Тип задачи
   */
  subsetID?: TaskType;
  /**
   * Статус задачи
   */
  statusID?: StatusType;
  isConfirmedContractor?: boolean;
  reportFiles: File[];
  closureFiles: File[];
  userOffersData: Offer[];
  outlayStatusID?: OutlayStatusType;
  toClose: boolean | undefined;
  isCurator: boolean;
  isContractor: boolean;
  isExecutor: boolean;
  isInvitedCurator: boolean;
  isInvitedExecutor: boolean;
  isInternalExecutor: boolean;
  isCommentsAvailable: boolean;
  isCuratorAllowedTask: boolean;
  isOffersDeadlineOver: boolean;
  isTaskClosedWithoutMessages: boolean;
  isTaskWithUnconfirmedCurator: boolean;
  isLastChangesFromCoordinator: boolean;
  isTaskCanceledWithoutMessages: boolean;
  onWorkDelivery: () => void;
  navigateToChat: () => void;
  onBecomeCurator: () => void;
  onTaskSubmission: () => void;
  onSubmitAnTask: () => void;
  onOpenCancelModalVisible: () => void;
  onUploadModalVisible: () => void;
  onBudgetModalVisible: () => void;
  onSubmissionModalVisible: (isSubmissionByCurator?: boolean) => void;
  onApproveEstimateChanges: () => void;
  onSendEstimateForApproval: () => void;
  isRefusedInvitedCurator: boolean;
  isRefusedInvitedExecutor: boolean;
  onCancelTask: (refuseReason?: string) => void;
}): TaskCardBottomButton[] => {
  switch (subsetID) {
    case TaskType.COMMON_FIRST_RESPONSE:
      //к закрытию
      if (toClose) {
        switch (tab) {
          case TaskTab.REPORT:
            if (closureFiles.length) {
              return [
                {
                  label: 'Загрузить еще файлы',
                  variant: 'accent',
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
          default:
            return [];
        }
      }
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
                  onPress: onSubmitAnTask,
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
                  onPress: onSubmitAnTask,
                },
              ];
            default:
              return [];
          }
        case StatusType.WORK:
          switch (tab) {
            case TaskTab.REPORT:
              if (reportFiles.length) {
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            case TaskTab.ESTIMATE:
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
                    variant: 'ghost',
                    onPress: onOpenCancelModalVisible,
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            default:
              return [];
          }
        case StatusType.SUMMARIZING:
        case StatusType.PAID:
        case StatusType.COMPLETED:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
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
              if (reportFiles.length) {
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
        case StatusType.PENDING:
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
        case StatusType.CLOSED:
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
      //к закрытию
      if (toClose) {
        switch (tab) {
          case TaskTab.REPORT:
            if (closureFiles.length) {
              return [
                {
                  label: 'Загрузить еще файлы',
                  variant: 'accent',
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
          default:
            return [];
        }
      }
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
            case TaskTab.COMMENTS:
              if (isOffersDeadlineOver && !userOffersData.length) {
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
                  onPress: onSubmitAnTask,
                },
              ];
            default:
              return [];
          }
        case StatusType.WORK:
          switch (tab) {
            case TaskTab.REPORT:
              if (reportFiles.length) {
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            case TaskTab.ESTIMATE:
              return [
                {
                  label: 'Сдать работы',
                  variant: 'accent',
                  onPress: onWorkDelivery,
                },
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            default:
              return [];
          }
        case StatusType.SUMMARIZING:
        case StatusType.PAID:
        case StatusType.COMPLETED:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
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
              if (reportFiles.length) {
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

        case StatusType.PENDING:
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
        case StatusType.CLOSED:
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
    case TaskType.IT_FIRST_RESPONSE:
      //к закрытию
      if (toClose) {
        switch (tab) {
          case TaskTab.REPORT:
            if (isContractor) {
              return [];
            }
            if (closureFiles.length) {
              return [
                {
                  label: 'Загрузить еще файлы',
                  variant: 'accent',
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
          default:
            return [];
        }
      }
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
            case TaskTab.COMMENTS:
              // приглашенный координатором куратор
              if (isInvitedCurator) {
                return [
                  {
                    label: 'Стать куратором',
                    variant: 'outlineAccent',
                    onPress: onBecomeCurator,
                  } as TaskCardBottomButton,
                ];
              }
              // куратор/подрядчик/приглашенный координатором исполнитель/задача без участия куратора
              if (
                isCurator ||
                isContractor ||
                isInvitedExecutor ||
                !isCuratorAllowedTask
              ) {
                return [
                  ...(!isCurator
                    ? [
                        {
                          label: 'Принять задачу',
                          variant: 'accent',
                          onPress: isContractor
                            ? onTaskSubmission
                            : onSubmissionModalVisible,
                        } as TaskCardBottomButton,
                      ]
                    : []),
                  // задача с участием куратора, в которой нет приглашенного координатором исполнителя
                  ...(isCuratorAllowedTask && !isInvitedExecutor
                    ? [
                        {
                          label: isContractor
                            ? 'Отклонить приглашение'
                            : 'Отказаться от задачи',
                          variant: 'ghost',
                          onPress: isContractor
                            ? onOpenCancelModalVisible
                            : onCancelTask,
                        } as TaskCardBottomButton,
                      ]
                    : []),
                ];
              }
              return [
                {
                  label: 'Принять задачу как исполнитель',
                  variant: 'accent',
                  onPress: onSubmissionModalVisible,
                },
                // задача с участием куратора, который её ещё не принял (или принял, но отказался)
                ...(isTaskWithUnconfirmedCurator
                  ? [
                      {
                        label: 'Стать куратором',
                        variant: 'outlineAccent',
                        onPress: onBecomeCurator,
                      } as TaskCardBottomButton,
                    ]
                  : []),
              ];
            default:
              return [];
          }

        case StatusType.WORK: {
          switch (tab) {
            case TaskTab.DESCRIPTION:
              return [
                ...(!isCurator
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            case TaskTab.ESTIMATE:
              return [
                ...(!isContractor &&
                ((outlayStatusID === OutlayStatusType.PENDING &&
                  !isLastChangesFromCoordinator) ||
                  (outlayStatusID &&
                    [
                      OutlayStatusType.RETURNED,
                      OutlayStatusType.MATCHING,
                    ].includes(outlayStatusID)))
                  ? [
                      {
                        label: 'Отправить смету на согласование',
                        variant: 'accent',
                        onPress: onSendEstimateForApproval,
                        disabled: outlayStatusID === OutlayStatusType.MATCHING,
                      } as TaskCardBottomButton,
                    ]
                  : []),

                // Если последние изменения были только от координатора
                ...(isLastChangesFromCoordinator &&
                outlayStatusID === OutlayStatusType.PENDING
                  ? [
                      {
                        label: 'Согласовать изменения сметы',
                        variant: 'accent',
                        onPress: onApproveEstimateChanges,
                      } as TaskCardBottomButton,
                    ]
                  : []),

                ...(!isCurator && outlayStatusID === OutlayStatusType.READY
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
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
              return [];
            case TaskTab.REPORT:
              return [
                ...(isCurator
                  ? [
                      {
                        label: 'Отказаться от задачи',
                        variant: 'ghost',
                        onPress: onOpenCancelModalVisible,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                ...(!isCurator
                  ? !reportFiles.length
                    ? [
                        {
                          label: 'Загрузить файлы',
                          variant: 'accent',
                          onPress: onUploadModalVisible,
                        } as TaskCardBottomButton,
                      ]
                    : [
                        {
                          label: 'Сдать работы',
                          variant: 'accent',
                          onPress: onWorkDelivery,
                        } as TaskCardBottomButton,
                        {
                          label: 'Загрузить еще файлы',
                          variant: 'outlineAccent',
                          onPress: onUploadModalVisible,
                        } as TaskCardBottomButton,
                      ]
                  : []),
              ];
            case TaskTab.HISTORY:
              return [
                ...(!isCurator
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];

            default:
              return [];
          }
        }

        case StatusType.PAID:
        case StatusType.COMPLETED:
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
              if (
                (isCurator &&
                  [StatusType.COMPLETED, StatusType.PAID].includes(statusID)) ||
                !isCurator
              ) {
                return !reportFiles.length
                  ? [
                      {
                        label: 'Загрузить файлы',
                        variant: 'accent',
                        onPress: onUploadModalVisible,
                      },
                    ]
                  : [
                      {
                        label: 'Загрузить еще файлы',
                        variant: 'outlineAccent',
                        onPress: onUploadModalVisible,
                      },
                    ];
              }
              return [];
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
              return [];
            default:
              return [];
          }
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable && !isTaskCanceledWithoutMessages) {
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
        case StatusType.CLOSED:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable && !isTaskClosedWithoutMessages) {
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

        case StatusType.PENDING:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
          switch (tab) {
            case TaskTab.COMMENTS:
              return [
                {
                  label: 'Перейти в чат',
                  variant: 'accent',
                  onPress: navigateToChat,
                },
              ];
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
      //к закрытию IT-Лоты
      if (toClose) {
        switch (tab) {
          case TaskTab.REPORT:
            if (isContractor) {
              return [];
            }
            if (closureFiles.length) {
              return [
                {
                  label: 'Загрузить еще файлы',
                  variant: 'accent',
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
          default:
            return [];
        }
      }
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
            case TaskTab.COMMENTS:
              if (isOffersDeadlineOver && !userOffersData.length) {
                return [];
              }
              if (userOffersData.length && !isContractor) {
                return [
                  {
                    label: 'Отозвать смету',
                    variant: 'outlineDanger',
                    onPress: onBudgetModalVisible,
                  },
                ];
              }
              // приглашенный координатором куратор, который не отзывал смету
              if (isInvitedCurator && !isRefusedInvitedCurator) {
                return [
                  {
                    label: 'Подать смету',
                    onPress: () => onSubmissionModalVisible(true),
                  } as TaskCardBottomButton,
                ];
              }
              // подрядчик/приглашенный координатором исполнитель/приглашенный координатором, но откавшийся исполнитель/задача без участия куратора
              if (
                isContractor ||
                isInvitedExecutor ||
                isRefusedInvitedExecutor ||
                !isCuratorAllowedTask
              ) {
                return [
                  ...(!isConfirmedContractor
                    ? [
                        {
                          label: isContractor
                            ? 'Принять задачу'
                            : 'Подать смету',
                          variant: 'accent',
                          onPress: isContractor
                            ? onTaskSubmission
                            : onSubmissionModalVisible,
                        } as TaskCardBottomButton,
                      ]
                    : []),
                  // задача с участием куратора, в которой нет приглашенного координатором исполнителя
                  ...(isContractor
                    ? [
                        {
                          label: 'Отклонить приглашение',
                          variant: 'outlineDanger',
                          onPress: onOpenCancelModalVisible,
                        } as TaskCardBottomButton,
                      ]
                    : []),
                ];
              }
              return [
                {
                  label: 'Подать смету как исполнитель',
                  variant: 'accent',
                  onPress: isContractor
                    ? onTaskSubmission
                    : onSubmissionModalVisible,
                } as TaskCardBottomButton,
                // задача с участием куратора, который её ещё не принял (или принял, но отказался)
                ...(isTaskWithUnconfirmedCurator || isRefusedInvitedCurator
                  ? [
                      {
                        label: 'Подать смету как куратор',
                        variant: 'outlineAccent',
                        onPress: () => onSubmissionModalVisible(true),
                      } as TaskCardBottomButton,
                    ]
                  : []),
              ];
            default:
              return [];
          }
        case StatusType.WORK: {
          switch (tab) {
            case TaskTab.DESCRIPTION:
              return [
                ...(!isCurator
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            case TaskTab.ESTIMATE:
              return [
                ...(!isContractor &&
                ((outlayStatusID === OutlayStatusType.PENDING &&
                  !isLastChangesFromCoordinator) ||
                  (outlayStatusID &&
                    [
                      OutlayStatusType.RETURNED,
                      OutlayStatusType.MATCHING,
                    ].includes(outlayStatusID)))
                  ? [
                      {
                        label: 'Отправить смету на согласование',
                        variant: 'accent',
                        onPress: onSendEstimateForApproval,
                        disabled: outlayStatusID === OutlayStatusType.MATCHING,
                      } as TaskCardBottomButton,
                    ]
                  : []),

                ...(isContractor ||
                (isExecutor && outlayStatusID === OutlayStatusType.READY)
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
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
              return [];
            case TaskTab.REPORT:
              return [
                ...(!isCurator
                  ? !reportFiles.length
                    ? [
                        {
                          label: 'Загрузить файлы',
                          variant: 'accent',
                          onPress: onUploadModalVisible,
                        } as TaskCardBottomButton,
                      ]
                    : [
                        ...(!isCurator
                          ? [
                              {
                                label: 'Сдать работы',
                                variant: 'accent',
                                onPress: onWorkDelivery,
                              } as TaskCardBottomButton,
                            ]
                          : []),
                        {
                          label: 'Загрузить еще файлы',
                          variant: 'outlineAccent',
                          onPress: onUploadModalVisible,
                        } as TaskCardBottomButton,
                      ]
                  : []),
              ];
            case TaskTab.HISTORY:
              return [
                ...(!isCurator
                  ? [
                      {
                        label: 'Сдать работы',
                        variant: 'accent',
                        onPress: onWorkDelivery,
                      } as TaskCardBottomButton,
                    ]
                  : []),
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];

            default:
              return [];
          }
        }

        case StatusType.PAID:
        case StatusType.COMPLETED:
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
              if (!isCurator) {
                return !reportFiles.length
                  ? [
                      {
                        label: 'Загрузить файлы',
                        variant: 'accent',
                        onPress: onUploadModalVisible,
                      },
                    ]
                  : [
                      {
                        label: 'Загрузить еще файлы',
                        variant: 'outlineAccent',
                        onPress: onUploadModalVisible,
                      },
                    ];
              }
              return [];
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.HISTORY:
              return [];
            default:
              return [];
          }
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable && !isTaskCanceledWithoutMessages) {
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
        case StatusType.CLOSED:
          switch (tab) {
            case TaskTab.COMMENTS:
              if (isCommentsAvailable && !isTaskClosedWithoutMessages) {
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

        case StatusType.PENDING:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
        case StatusType.SIGNING:
          switch (tab) {
            case TaskTab.COMMENTS:
              return [
                {
                  label: 'Перейти в чат',
                  variant: 'accent',
                  onPress: navigateToChat,
                },
              ];
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
    case TaskType.IT_INTERNAL_EXECUTIVES:
      // к закрытию
      if (toClose) {
        switch (tab) {
          case TaskTab.REPORT:
            if (closureFiles.length) {
              return [
                {
                  label: 'Загрузить еще файлы',
                  variant: 'accent',
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
          default:
            return [];
        }
      }
      switch (statusID) {
        case StatusType.ACTIVE:
          switch (tab) {
            case TaskTab.DESCRIPTION:
            case TaskTab.ESTIMATE:
            case TaskTab.REPORT:
            case TaskTab.HISTORY:
            case TaskTab.COMMENTS:
              if (isExecutor) {
                return [
                  {
                    label: 'Отказаться от задачи',
                    variant: 'ghost',
                    onPress: onOpenCancelModalVisible,
                  },
                ];
              }
              return [
                {
                  label: 'Принять задачу',
                  variant: 'accent',
                  onPress: onSubmitAnTask,
                },
              ];
            default:
              return [];
          }
        case StatusType.WORK:
          switch (tab) {
            case TaskTab.REPORT:
              if (reportFiles.length) {
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
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
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            case TaskTab.ESTIMATE:
              return [
                {
                  label: 'Сдать работы',
                  variant: 'accent',
                  onPress: onWorkDelivery,
                },
                {
                  label: 'Отказаться от задачи',
                  variant: 'ghost',
                  onPress: onOpenCancelModalVisible,
                },
              ];
            default:
              return [];
          }
        case StatusType.SUMMARIZING:
        case StatusType.PAID:
        case StatusType.COMPLETED:
        case StatusType.MATCHING:
        case StatusType.RETURNED:
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
              if (reportFiles.length) {
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
        case StatusType.PENDING:
        case StatusType.CANCELLED_BY_CUSTOMER:
        case StatusType.CANCELLED_BY_EXECUTOR:
        case StatusType.CLOSED:
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
    default:
      return [];
  }
};
