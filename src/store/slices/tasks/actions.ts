import tasks from './reducer';

export const {
  setTaskFileOnDevice,
  setTaskFilesOnDevice,
  setProgresses,
  deleteProgress,
  setNewOfferServices,
  addOfferService,
  addServiceLocalPrice,
  addMaterialLocalPrice,
  setOfferComment,
  setOfferID,
  setTaskFileLoading,
  addMaterialLocalCount,
  addServiceLocalCount,
} = tasks.actions;
