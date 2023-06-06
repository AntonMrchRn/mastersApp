import userAuth from './reducer';

export const {
  login,
  logOut,
  timerOnEmail,
  timerOffEmail,
  timerOnPhone,
  timerOffPhone,
  timeoutAsyncPhone,
  timeoutAsyncEmail,
  setIsRecoveryByEmail,
  setIsRecoveryByPhone,
  clearIsRecoveryByPhone,
  clearIsRecoveryByEmail,
} = userAuth.actions;
