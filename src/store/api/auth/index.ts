import { api } from '@/store/api';
import {
  ChangePasswordParams,
  ChangePasswordResponse,
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
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordParams
    >({
      query: data => ({
        url: 'me/password',
        method: 'PATCH',
        data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserAuthMutation, useChangePasswordMutation } = authAPI;
