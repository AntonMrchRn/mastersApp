import { api } from '@/store/api';
import {
  PasswordRecoveryParams,
  PasswordRecoveryResponse,
  RecoveryCodeParams,
  RecoveryCodeResponse,
  UserAuthParams,
  UserAuthResponse,
} from '@/store/slices/auth/types';

export const authAPI = api.injectEndpoints({
  endpoints: builder => ({
    getUserAuth: builder.mutation<UserAuthResponse, UserAuthParams>({
      query: ({ login, password }) => ({
        url: 'login?isMobile=true',
        method: 'POST',
        data: {
          login,
          password,
        },
      }),
    }),
    sendPasswordRecoveryCode: builder.mutation<
      RecoveryCodeResponse,
      RecoveryCodeParams
    >({
      query: ({ email, password, phoneNumber, isPhoneAuth }) => ({
        url: 'me/password',
        method: 'PATCH',
        data: {
          ...(isPhoneAuth ? { phone: Number(phoneNumber) } : { email }),
          password,
        },
      }),
    }),
    restorePassword: builder.mutation<
      PasswordRecoveryResponse,
      PasswordRecoveryParams
    >({
      query: ({ code, password }) => ({
        url: 'me/password',
        method: 'PATCH',
        data: {
          code,
          password,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserAuthMutation,
  useRestorePasswordMutation,
  useSendPasswordRecoveryCodeMutation,
} = authAPI;
