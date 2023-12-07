import { store } from '@/store';
import { api } from '@/store/api';
import {
  AccountDeletionParams,
  Activity,
  ConfirmationCodeResponse,
  EntityType,
  PhoneEditingResponse,
  PostTokenParams,
  Region,
  TeamMemberDeletionParams,
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
      getUser: builder.query<User | undefined, number | undefined | null>({
        query: (id: number) => ({
          url: `users?query=?ID==${id}?`,
          method: 'GET',
        }),
        providesTags: ['user'],
        transformResponse: (response: UserResponse) => response.users[0],
      }),
      getUsers: builder.query<User[], number[]>({
        query: (IDs: number[]) => ({
          url: `users?query=?ID==${IDs.join()}?`,
          method: 'GET',
        }),
        transformResponse: (response: UserResponse) => response.users,
      }),
      getEntityTypes: builder.query<EntityType[], void>({
        query: () => ({
          url: 'aux?query=?tableName==user_entity_type?',
          method: 'GET',
        }),
      }),
      getActivities: builder.query<Activity[], void>({
        query: () => ({
          url: 'aux?query=?tableName==set?',
          method: 'GET',
        }),
      }),
      getRegions: builder.query<Region[], void>({
        query: () => ({
          url: 'regions?query=??name,asc,,',
          method: 'GET',
        }),
      }),
      getInvitationLink: builder.query<string, void>({
        query: () => ({
          url: 'users/invite',
          method: 'GET',
        }),
      }),
      getUserParams: builder.query<UserParamsResponse, void>({
        query: () => ({
          url: 'params',
          method: 'GET',
        }),
      }),
      enableBotNotifications: builder.query<undefined, void>({
        query: () => ({
          url: 'telegram/status?isActive=true',
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
      addFiles: builder.mutation<File[], FilesParams>({
        query: ({ formData, files, date, signal }) => {
          return {
            url: 'me/files',
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
      deleteTeamMember: builder.mutation<void, TeamMemberDeletionParams>({
        query: data => ({
          url: 'me/team',
          method: 'PATCH',
          data,
        }),
        invalidatesTags: ['user'],
      }),
      deleteAccount: builder.mutation<void, AccountDeletionParams>({
        query: data => ({
          url: 'users/activity?operation=deactivation',
          method: 'POST',
          data,
        }),
      }),
      postToken: builder.mutation<void, PostTokenParams>({
        query: data => ({
          url: 'devices',
          method: 'POST',
          data,
        }),
      }),
      deleteToken: builder.mutation<void, void>({
        query: () => ({
          url: 'devices',
          method: 'DELETE',
        }),
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
  useGetUsersQuery,
  useGetRegionsQuery,
  useGetActivitiesQuery,
  useGetUserParamsQuery,
  useGetEntityTypesQuery,
  useLazyEnableBotNotificationsQuery,
  useLazyGetInvitationLinkQuery,
  useEditUserMutation,
  useEditPhoneMutation,
  useAddFilesMutation,
  useDeleteFileMutation,
  useDeleteAccountMutation,
  useDeleteTeamMemberMutation,
  useSendEmailConfirmationCodeMutation,
  useSendPhoneConfirmationCodeMutation,
  usePostTokenMutation,
  useDeleteTokenMutation,
} = userAPI;
