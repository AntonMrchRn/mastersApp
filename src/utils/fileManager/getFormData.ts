import { StatusType } from '@/types/task';

export const getFormData = ({
  taskId,
  toClose,
  statusID,
}: {
  taskId?: number;
  toClose?: boolean | undefined;
  statusID?: StatusType | undefined;
}) => {
  const formData = new FormData();
  if (taskId) {
    formData.append('taskID', taskId);
    if (
      !toClose &&
      (!statusID ||
        (statusID &&
          ![StatusType.PAID, StatusType.COMPLETED].includes(statusID)))
    ) {
      formData.append('isApplication', false);
      formData.append('isOffer', true);
      formData.append('isCheck', false);
    }
  }
  return formData;
};
