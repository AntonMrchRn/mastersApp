import user from './reducer';

export const {
  deleteProgress,
  setProgresses,
  setIsPhoneEditing,
  setIsEmailEditing,
  timerOnProfileEmail,
  timerOffProfileEmail,
  timerOnProfilePhone,
  timerOffProfilePhone,
  setProfileEmailTimeout,
  setProfilePhoneTimeout,
  setIsApprovalNotificationShown,
} = user.actions;
