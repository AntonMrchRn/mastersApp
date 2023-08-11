export const getFormData = (taskId?: string, toClose?: boolean | undefined) => {
  const formData = new FormData();
  if (taskId) {
    formData.append('taskID', taskId);
    if (!toClose) {
      formData.append('isApplication', false);
      formData.append('isOffer', true);
      formData.append('isCheck', false);
    }
  }
  return formData;
};
