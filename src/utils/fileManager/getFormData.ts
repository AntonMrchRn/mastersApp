export const getFormData = (taskId?: string) => {
  const formData = new FormData();
  if (taskId) {
    formData.append('taskID', taskId);
    formData.append('isApplication', false);
    formData.append('isOffer', true);
    formData.append('isCheck', false);
  }

  return formData;
};
