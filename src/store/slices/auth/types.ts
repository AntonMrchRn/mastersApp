import { Error } from '../../../types/error';

type InitialState = {
  user: null | UserAuthResponse;
  isAuth: boolean;
  authError: null | string;
  authErrorCode: null | number;
  recoveryError: null | boolean | Error;
  isRecovery: boolean;
  isActiveTimer: boolean;
  isRecoveryEmail: boolean;
  isActiveTimerEmail: boolean;
  timeout: null | { timeout: number };
  timeOutEmail: null | { timeout: number };
  restore: boolean;
  loading: boolean;
};

type UserAuthParams = {
  phoneNumber: string;
  email: string;
  password: string;
  isPhoneAuth: boolean;
};

type RestorePasswordParams = {
  password: string;
  value: string;
};

type UserAuthResponse = {
  auth: boolean;
  roleID: number;
  token: string;
  userID: number;
  isMobile: boolean;
};

type RecoveryPasswordResponse = {
  timeout: number;
};

type RecoveryPasswordPayload = {
  data: { timeout: number };
  isPhoneAuth: boolean;
};

export type {
  InitialState,
  UserAuthParams,
  RestorePasswordParams,
  UserAuthResponse,
  RecoveryPasswordResponse,
  RecoveryPasswordPayload,
};
