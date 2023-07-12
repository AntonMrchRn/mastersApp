export const getFormData = (taskId?: string) => {
  const formData = new FormData();
  if (taskId) {
    formData.append('taskID', taskId);
    formData.append('isApplication', true);
    formData.append('isOffer', false);
    formData.append('isCheck', false);
  }

  return formData;
};
