import { api } from '@/store/api';
import { UserResponse } from '@/store/api/user/types';

export const userAPI = api
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getUser: builder.query<UserResponse, number | undefined>({
        query: (id: number) => ({
          url: `users?query=?ID==${id}?`,
          method: 'GET',
          providesTags: ['user'],
        }),
      }),
    }),
    overrideExisting: true,
  });

export const { useGetUserQuery } = userAPI;
