import user from './reducer';

export const {
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
