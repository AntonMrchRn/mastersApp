import { api } from '@/store/api';
import {
  ConfirmationCodeResponse,
  EntityType,
  PhoneEditingResponse,
  User,
  UserEditingParams,
  UserParamsResponse,
  UserResponse,
} from '@/store/api/user/types';

export const userAPI = api
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getUser: builder.query<User | undefined, number | undefined>({
        query: (id: number) => ({
          url: `users?query=?ID==${id}?`,
          method: 'GET',
        }),
        providesTags: ['user'],
        transformResponse: (response: UserResponse) => response.users[0],
      }),
      getEntityTypes: builder.query<EntityType[], void>({
        query: () => ({
          url: 'aux?query=?tableName==user_entity_type?',
          method: 'GET',
        }),
      }),
      sendEmailConfirmationCode: builder.mutation<
        ConfirmationCodeResponse,
        string
      >({
        query: newEmail => ({
          url: 'me/email',
          method: 'PATCH',
          data: {
            newEmail,
          },
        }),
      }),
      sendPhoneConfirmationCode: builder.mutation<
        ConfirmationCodeResponse,
        string
      >({
        query: newPhone => ({
          url: 'me/phone',
          method: 'PATCH',
          data: { newPhone: Number(newPhone) },
        }),
      }),
      editPhone: builder.mutation<PhoneEditingResponse, string>({
        query: code => ({
          url: 'me/phone',
          method: 'PATCH',
          data: { code },
        }),
        invalidatesTags: ['user'],
      }),
      editUser: builder.mutation<User, UserEditingParams>({
        query: data => ({
          url: 'users',
          method: 'PATCH',
          data: data,
        }),
        invalidatesTags: ['user'],
      }),
      getUserParams: builder.query<UserParamsResponse, void>({
        query: () => ({
          url: 'params',
          method: 'GET',
        }),
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetUserQuery,
  useGetUserParamsQuery,
  useGetEntityTypesQuery,
  useEditUserMutation,
  useEditPhoneMutation,
  useSendEmailConfirmationCodeMutation,
  useSendPhoneConfirmationCodeMutation,
} = userAPI;
