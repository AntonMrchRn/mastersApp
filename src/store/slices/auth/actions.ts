import auth from './reducer';

export const {
  login,
  logOut,
  setUserAuth,
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
} = auth.actions;
