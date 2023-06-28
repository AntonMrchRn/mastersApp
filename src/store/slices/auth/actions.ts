import auth from './reducer';

export const {
  login,
  logOut,
  setUserAuth,
  timerOnAuthEmail,
  timerOffAuthEmail,
  timerOnAuthPhone,
  timerOffAuthPhone,
  setAuthPhoneTimeout,
  setAuthEmailTimeout,
  setIsRecoveryByEmail,
  setIsRecoveryByPhone,
} = auth.actions;
