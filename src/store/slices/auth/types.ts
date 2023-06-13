type InitialState = {
  user: null | UserAuthResponse;
  isAuth: boolean;
  isActiveTimerPhone: boolean;
  isRecoveryByPhone: boolean;
  isRecoveryByEmail: boolean;
  isActiveTimerEmail: boolean;
  timeoutPhone: null | { timeout: number };
  timeoutEmail: null | { timeout: number };
};

type UserAuthParams = {
  login: string;
  password: string;
};

type RecoveryCodeParams = {
  phoneNumber: string;
  email: string;
  password: string;
  isPhoneAuth: boolean;
};

type PasswordRecoveryParams = {
  code: string;
  password: string;
};

type UserAuthResponse = {
  auth: boolean;
  roleID: number;
  token: string;
  userID: number;
  isMobile: boolean;
};

type RecoveryCodeResponse = {
  timeout: number;
};

type PasswordRecoveryResponse = {
  data: null;
};

export type {
  InitialState,
  UserAuthParams,
  RecoveryCodeParams,
  PasswordRecoveryParams,
  UserAuthResponse,
  RecoveryCodeResponse,
  PasswordRecoveryResponse,
};
