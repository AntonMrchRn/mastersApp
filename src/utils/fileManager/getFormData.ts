import { StatusType } from '@/types/task';

export const getFormData = ({
  taskId,
  toClose,
  statusID,
  isContractor,
}: {
  taskId?: number;
  toClose?: boolean | undefined;
  statusID?: StatusType | undefined;
  isContractor?: boolean;
}) => {
  const formData = new FormData();
  if (taskId) {
    formData.append('taskID', taskId);
    if (
      !toClose &&
      (!statusID ||
        (statusID &&
          ![StatusType.PAID, StatusType.COMPLETED].includes(statusID)) ||
        // подрядчик не может добавлять закрывающие документы
        isContractor)
    ) {
      formData.append('isApplication', false);
      formData.append('isOffer', true);
      formData.append('isCheck', false);
    }
  }
  return formData;
};
