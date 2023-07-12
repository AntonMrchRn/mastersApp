import { store } from '@/store';
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
import { setProgresses } from '@/store/slices/user/actions';
import { File, FilesParams, Progress } from '@/types/fileManager';

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
          data,
        }),
        invalidatesTags: ['user'],
      }),
      getUserParams: builder.query<UserParamsResponse, void>({
        query: () => ({
          url: 'params',
          method: 'GET',
        }),
      }),
      addFiles: builder.mutation<File[], FilesParams>({
        query: ({ formData, files, date, signal }) => {
          return {
            url: `me/files`,
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            signal,
            onUploadProgress: progressEvent => {
              const progress: Progress = {
                loaded: progressEvent.loaded,
                total: progressEvent.total,
                progress: progressEvent.progress,
                bytes: progressEvent.bytes,
                rate: progressEvent.rate,
                estimated: progressEvent.estimated,
                upload: progressEvent.upload,
                download: progressEvent.download,
                files,
              };
              const payload = { [date]: progress };
              store.dispatch(setProgresses(payload));
            },
          };
        },
        invalidatesTags: ['user'],
      }),
      deleteFile: builder.mutation<UserParamsResponse, number>({
        query: id => ({
          url: `me/files/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['user'],
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
  useAddFilesMutation,
  useDeleteFileMutation,
  useSendEmailConfirmationCodeMutation,
  useSendPhoneConfirmationCodeMutation,
} = userAPI;
