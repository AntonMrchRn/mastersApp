import userAuth from './reducer';

export const {
  login,
  logOut,
  clearIsRecovery,
  timerOn,
  timerOff,
  clearIsRecoveryEmail,
  timerOnEmail,
  timerOffEmail,
  clearRecoveryError,
  clearAuthError,
  timeOutAsync,
  timeOutAsyncEmail,
} = userAuth.actions;
