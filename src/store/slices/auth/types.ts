import { UserRole } from '@/types/user';

type InitialState = {
  user: null | UserAuthResponse;
  isAuth: boolean;
  isRecoveryByPhone: boolean;
  isRecoveryByEmail: boolean;
  isActiveEmailTimer: boolean;
  isActivePhoneTimer: boolean;
  phoneTimeout: null | { timeout: number };
  emailTimeout: null | { timeout: number };
};

type UserAuthParams = {
  login: string;
  password: string;
};

type RecoveryCodeParams =
  | (
      | {
          phone: number;
        }
      | {
          email: string;
        }
    ) & {
      password: string;
    };

type PasswordRecoveryParams = {
  code: string;
  password: string;
};

type PasswordEditingParams = {
  password: string;
  newPassword: string;
};

type ChangePasswordParams =
  | RecoveryCodeParams
  | PasswordRecoveryParams
  | PasswordEditingParams;

type UserAuthResponse = {
  auth: boolean;
  roleID: number;
  token: string;
  userID: number;
  isMobile: boolean;
  roleDescription: UserRole;
};

type RecoveryCodeResponse = {
  timeout: number;
};

type PasswordRecoveryResponse = {
  data: null;
};

type ChangePasswordResponse = RecoveryCodeResponse | PasswordRecoveryResponse;

export type {
  InitialState,
  UserAuthParams,
  ChangePasswordParams,
  UserAuthResponse,
  ChangePasswordResponse,
};
