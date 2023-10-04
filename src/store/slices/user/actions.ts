import user from './reducer';

export const {
  timerOffLink,
  timerOnLink,
  setProgresses,
  deleteProgress,
  setLinkTimeout,
  setIsPhoneEditing,
  setIsEmailEditing,
  timerOnProfileEmail,
  timerOffProfileEmail,
  timerOnProfilePhone,
  timerOffProfilePhone,
  setIsLinkGenerating,
  setProfileEmailTimeout,
  setProfilePhoneTimeout,
  setUserFileOnDevice,
  setUserFilesOnDevice,
  setIsApprovalNotificationShown,
} = user.actions;
